<script>
  let S = $state(66.6)
  let W = $state(300)
  let F = $state(400)
  let T = $state(9)
  let Y = $state(0.5)

  function sig2(n) { return n.toPrecision(2) }
  function pct(n)  { return (n * 100).toPrecision(3) + '%' }

  let pctStarter = $derived(pct(S / F))
  let pctWater   = $derived(pct(W / F))
  let pctSalt    = $derived(T ? pct(T / F) : 'n/a')
  let pctYeast   = $derived(Y ? pct(Y / F) : 'n/a')

  let ratioWater = $derived(sig2(W / S))
  let ratioFlour = $derived(sig2(F / S))
  let ratioSalt  = $derived(T ? pct(T / S) : 'n/a')
  let ratioYeast = $derived(Y ? pct(Y / S) : 'n/a')
</script>

<noscript>The interactivity below requires client-side JavaScript. Not common for me, I know, but that's all I've got for readable content in this blog post!</noscript>

<div id="dough-ratio-calculator">
  <ul>
    <li><input type="number" bind:value={S} /> starter</li>
    <li><input type="number" bind:value={W} /> water</li>
    <li><input type="number" bind:value={F} /> flour</li>
    <li><input type="number" bind:value={T} /> salt</li>
    <li><input type="number" bind:value={Y} /> yeast</li>
  </ul>

  <table>
    <caption>Baker's Percentages</caption>
    <tbody>
      <tr><td>starter:</td><td>{pctStarter}</td></tr>
      <tr><td>water:</td>  <td>{pctWater}</td></tr>
      <tr><td>flour:</td>  <td>100% always</td></tr>
      <tr><td>salt:</td>   <td>{pctSalt}</td></tr>
      <tr><td>yeast:</td>  <td>{pctYeast}</td></tr>
    </tbody>
  </table>

  <p>
    <strong>ratios by starter</strong><br/>
    <abbr title="starter">1</abbr>
    : <abbr title="water">{ratioWater}</abbr>
    : <abbr title="flour">{ratioFlour}</abbr>
    : <abbr title="salt">{ratioSalt}</abbr>
    : <abbr title="yeast">{ratioYeast}</abbr>
  </p>
</div>
