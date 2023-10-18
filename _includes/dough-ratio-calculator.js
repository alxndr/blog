<script type="module">
import { reactive, html } from 'https://esm.sh/@arrow-js/core';

function int(n) {
  return n.toPrecision(2);
}
function pct(n) {
  return (n*100).toPrecision(3)+'%';
}

const root$ = document.getElementById('dough-ratio-calculator');
const d = reactive({ S: 66.6, W: 300, F: 400, Y: 0.5, T: 9, });
html`
  <ul>
    <li><input value="${() => d.S}" @input="${e => { d.S = e.target.value }}" /> starter
    <li><input value="${() => d.W}" @input="${e => { d.W = e.target.value }}" /> water
    <li><input value="${() => d.F}" @input="${e => { d.F = e.target.value }}" /> flour
    <li><input value="${() => d.Y}" @input="${e => { d.Y = e.target.value }}" /> yeast
    <li><input value="${() => d.T}" @input="${e => { d.T = e.target.value }}" /> salt
  </ul>
  <table><caption>Bakers Percentages</caption>
    <tr><td>starter:</td><td>${() => pct(d.S/d.F)}</td></tr>
    <tr>  <td>water:</td><td>${() => pct(d.W/d.F)}</td></tr>
    <tr>  <td>flour:</td><td>100% always</td>          </tr>
    ${d.Y && `<tr><td>yeast:</td><td>${() => pct(d.Y/d.F)}</td></tr>`}
    ${d.T && `<tr> <td>salt:</td><td>${() => pct(d.T/d.F)}</td></tr>`}
  </table>
  <p><caption>ratios by starter</caption>
    <br/> <abbr title="starter">1</abbr>
    : <abbr title="water">${() => int(d.W/d.S)}</abbr>
    : <abbr title="flour">${() => int(d.F/d.S)}</abbr>
    : <abbr title="yeast">${() => pct(d.Y/d.S)}</abbr>
    : <abbr title="salt" >${() => pct(d.T/d.S)}</abbr>
  </p>
`(root$);

</script>
