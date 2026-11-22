import { readFile } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'

const endpoint = 'https://text.external-api.pangram.com/task'
const args = process.argv.slice(2)
const usage = 'Usage: node scripts/check-writing.mjs <plain-text-file|->'

async function main() {
  if (args.length === 1 && args[0] === '--help') {
    console.log(usage)
    console.log('Pass - to read from stdin. Running a check submits that text to Pangram using your API credits.')
    return
  }
  if (args.length !== 1) throw new Error(usage)

  const key = process.env.PANGRAM_API_KEY
  if (!key) throw new Error('Set PANGRAM_API_KEY in your local environment.')

  let text
  if (args[0] === '-') {
    process.stdin.setEncoding('utf8')
    text = ''
    for await (const chunk of process.stdin) text += chunk
  } else {
    text = await readFile(args[0], 'utf8')
  }
  if (!text.trim()) throw new Error('Provide some prose to check.')

  async function request(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: { 'content-type': 'application/json', 'x-api-key': key },
      signal: AbortSignal.timeout(15_000),
    })
    if (!response.ok) throw new Error('Pangram returned HTTP ' + response.status + '.')
    return response.json()
  }

  const task = await request(endpoint, {
    method: 'POST',
    body: JSON.stringify({ text, public_dashboard_link: false }),
  })
  if (!task.task_id) throw new Error('Pangram did not return a task ID.')

  const deadline = Date.now() + 90_000
  do {
    const result = await request(endpoint + '/' + encodeURIComponent(task.task_id))
    if (result.stage === 'STAGE_FAILED') throw new Error('Pangram could not complete the check.')
    if (result.stage === 'STAGE_SUCCESS') {
      console.log(result.prediction_short ?? result.headline ?? 'Check complete.')
      for (const [label, fraction] of [
        ['Human', result.fraction_human],
        ['AI-assisted', result.fraction_ai_assisted],
        ['AI-generated', result.fraction_ai],
      ]) {
        if (typeof fraction === 'number') console.log(label + ': ' + Math.round(fraction * 100) + '%')
      }
      console.log('Treat this as an editing signal. It cannot establish who wrote a passage.')
      return
    }
    await sleep(1500)
  } while (Date.now() < deadline)
  throw new Error('Pangram did not finish within 90 seconds.')
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
