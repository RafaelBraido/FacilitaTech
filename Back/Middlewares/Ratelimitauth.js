/**
 * rateLimitAuth.js
 * ----------------
 * Limite simples de tentativas para /auth/register e /auth/login, para
 * dificultar ataques de força bruta (tentar muitas senhas seguidas).
 *
 * Guarda as tentativas em memória (por IP). Isso é suficiente para um
 * servidor único (como no Render, plano free). Se um dia o back-end
 * rodar em mais de uma instância ao mesmo tempo, cada instância teria
 * sua própria contagem — nesse caso, o ideal seria mover isso para o
 * Redis ou outro armazenamento compartilhado.
 */

const LIMITE_TENTATIVAS = 10;
const JANELA_MS = 15 * 60 * 1000; // 15 minutos

const tentativasPorIp = new Map();

function limparAntigos() {
  const agora = Date.now();
  for (const [ip, registro] of tentativasPorIp.entries()) {
    if (agora - registro.inicio > JANELA_MS) tentativasPorIp.delete(ip);
  }
}

export default function rateLimitAuth(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || "desconhecido";
  const agora = Date.now();

  limparAntigos();

  const registro = tentativasPorIp.get(ip) || { contagem: 0, inicio: agora };

  if (agora - registro.inicio > JANELA_MS) {
    registro.contagem = 0;
    registro.inicio = agora;
  }

  registro.contagem += 1;
  tentativasPorIp.set(ip, registro);

  if (registro.contagem > LIMITE_TENTATIVAS) {
    return res.status(429).json({
      message: "Muitas tentativas. Espere alguns minutos e tente de novo.",
    });
  }

  next();
}