// tools/test-live.js
import { spawn } from 'child_process';
import ngrok from 'ngrok';
import chalk from 'chalk';

const FRONTEND_PORT = 4200;
const BACKEND_PORT = 4100;

async function run() {
  console.log(chalk.cyan('🚀 Avvio test live Sharing TV Europa...\n'));

  // 1️⃣ Avvia backend locale
  console.log(chalk.yellow('▶️  Avvio backend...'));
  const be = spawn('npm', ['run', 'dev'], {
    cwd: '../sharing-tv-app-be',
    stdio: 'inherit',
    shell: true,
  });

  // 2️⃣ Avvia frontend Angular
  console.log(chalk.yellow('\n▶️  Avvio frontend Angular...'));
  const fe = spawn('ng', ['serve', '--port', FRONTEND_PORT, '--configuration', 'development'], {
    cwd: '.',
    stdio: 'inherit',
    shell: true,
  });

  // 3️⃣ Aspetta qualche secondo e poi apre ngrok
  console.log(chalk.gray('\n⏳ Attendo avvio locale (10s)...'));
  await new Promise((r) => setTimeout(r, 10000));

  console.log(chalk.yellow('🌍 Avvio tunnel ngrok...'));
  const url = await ngrok.connect({
    addr: FRONTEND_PORT,
    proto: 'http',
  });

  console.log(chalk.green('\n✅ LIVE TEST AVVIATO'));
  console.log(chalk.white('Apri questo link dal tuo smartphone:'));
  console.log(chalk.bold.blue(url + '\n'));

  console.log(chalk.gray('Puoi interrompere con CTRL + C quando hai finito.\n'));
}

run().catch((err) => {
  console.error(chalk.red('❌ Errore test live:'), err);
  process.exit(1);
});

