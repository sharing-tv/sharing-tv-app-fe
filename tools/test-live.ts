// tools/test-live.ts
// 🔹 Test automatico FE+BE con tunnel pubblico ngrok (TypeScript)

import { spawn, ChildProcess } from 'child_process';
import ngrok from 'ngrok';
import chalk from 'chalk';
import path from 'path';

const FRONTEND_PORT = 4200;

// === Config backend su WSL ===
const WSL_BACKEND_DIR = '/home/aleksander/sharing-tv-app-be'; // <-- Cambia se diverso
const USE_WSL = true;

// Avvio backend
function spawnBackend(): ChildProcess {
  if (USE_WSL) {
    console.log(chalk.yellow(`▶️  Avvio backend in WSL: ${WSL_BACKEND_DIR}`));
    return spawn('wsl.exe', ['bash', '-lc', `cd '${WSL_BACKEND_DIR}' && npm run dev`], {
      stdio: 'inherit',
    });
  } else {
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    console.log(chalk.yellow('▶️  Avvio backend (Windows)...'));
    return spawn(npmCmd, ['run', 'dev'], {
      cwd: path.resolve('../sharing-tv-app-be'),
      stdio: 'inherit',
    });
  }
}

// Avvio frontend
function spawnFrontend(): ChildProcess {
  console.log(chalk.yellow('\n▶️  Avvio frontend Angular...'));
  const cmd = process.platform === 'win32' ? 'cmd.exe' : 'bash';
  const args =
    process.platform === 'win32'
      ? ['/c', 'npx ng serve --port 4200 --configuration development --proxy-config proxy.conf.json --disable-host-check']
      : ['-lc', 'npx ng serve --port 4200 --configuration development --proxy-config proxy.conf.json --disable-host-check'];

  return spawn(cmd, args, { stdio: 'inherit' });
}



// Funzione principale
async function run(): Promise<void> {
  console.log(chalk.cyan('🚀 Avvio test live Sharing TV Europa...\n'));

  const be = spawnBackend();
  const fe = spawnFrontend();

  console.log(chalk.gray('\n⏳ Attendo avvio locale (10s)...'));
  await new Promise((r) => setTimeout(r, 10000));

  console.log(chalk.yellow('🌍 Avvio tunnel ngrok (frontend)...'));
  const publicUrl = await ngrok.connect({ addr: FRONTEND_PORT, proto: 'http' });

  console.log(chalk.green('\n✅ LIVE TEST AVVIATO'));
  console.log(chalk.white('Apri questo link dal tuo smartphone:'));
  console.log(chalk.bold.blue(publicUrl + '\n'));
  console.log(
    chalk.gray('Tutto passa tramite Angular proxy (/api, /proxy) → backend locale su 4100.')
  );
  console.log(chalk.gray('Interrompi con CTRL + C quando hai finito.\n'));

  // Chiusura tunnel e processi
  const cleanup = async () => {
    console.log(chalk.gray('\n🧹 Chiusura tunnel e processi...'));
    try {
      await ngrok.disconnect();
      await ngrok.kill();
    } catch {}
    try {
      be?.kill();
    } catch {}
    try {
      fe?.kill();
    } catch {}
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
}

run().catch((err) => {
  console.error(chalk.red('❌ Errore test live:'), err);
  process.exit(1);
});

