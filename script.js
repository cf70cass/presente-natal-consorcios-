const money = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const credit = document.getElementById('credit');
const rate = document.getElementById('rate');
const reduction = document.getElementById('reduction');
const rows = [20000,30000,40000,50000,60000,70000,80000,100000,150000,200000,250000,300000];

function calculate(){
  const amount = Number(credit.value);
  const percent = Number(rate.value);
  const discountPercent = Number(reduction.value);
  const entry = amount * percent / 100;
  const discount = entry * discountPercent / 100;
  const payable = entry - discount;
  document.getElementById('r-credit').textContent = money(amount);
  document.getElementById('r-entry').textContent = money(entry);
  document.getElementById('r-discount').textContent = money(discount);
  document.getElementById('r-pay').textContent = money(payable);
  return {amount,percent,entry,discount,payable};
}
[credit,rate,reduction].forEach(el=>el.addEventListener('change',calculate));
document.getElementById('table-body').innerHTML = rows.map(v=>`<tr><td>${money(v)}</td><td>${money(v*.15)}</td><td>${money(v*.20)}</td><td>${money(v*.30)}</td></tr>`).join('');
document.getElementById('whatsapp-sim').addEventListener('click',()=>{
  const r=calculate();
  const msg=`Olá! Quero informações sobre esta simulação:%0AValor da carta: ${encodeURIComponent(money(r.amount))}%0AEntrada calculada (${r.percent}%): ${encodeURIComponent(money(r.entry))}%0ARedução calculada: ${encodeURIComponent(money(r.discount))}%0AEntrada após redução: ${encodeURIComponent(money(r.payable))}%0APor favor, enviem as condições completas, taxas, parcelas e regras do plano.`;
  window.open(`https://wa.me/?text=${msg}`,'_blank','noopener');
});
const toggle=document.querySelector('.menu-toggle');
const nav=document.getElementById('nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
calculate();
