<script>
  let starter = $state(66.6)
  let water   = $state(300)
  let flour   = $state(400)
  let salt    = $state(9)
  let yeast   = $state(0.5)

  function sig2(n) { return n.toPrecision(2) }
  function pct(n)  { return (n * 100).toPrecision(3) + '%' }

  let pctStarter = $derived(pct(starter / flour))
  let pctWater   = $derived(pct(water / flour))
  let pctSalt    = $derived(salt  ? pct( salt / flour) : 'n/a')
  let pctYeast   = $derived(yeast ? pct(yeast / flour) : 'n/a')

  let ratioWater = $derived(sig2(water / starter))
  let ratioFlour = $derived(sig2(flour / starter))
  let ratioSalt  = $derived(salt ? pct(salt / starter) : 'n/a')
  let ratioYeast = $derived(yeast ? pct(yeast / starter) : 'n/a')
</script>

<noscript>The interactivity below requires client-side JavaScript. Not common for me, I know, but that's all I've got for readable content in this blog post!</noscript>

<div id="dough-ratio-calculator">
  <ul>
    <li><label><input type="number" bind:value={starter} /> starter</label></li>
    <li><label><input type="number" bind:value={water} /> water</label></li>
    <li><label><input type="number" bind:value={flour} /> flour</label></li>
    <li><label><input type="number" bind:value={salt} /> salt</label></li>
    <li><label><input type="number" bind:value={yeast} /> yeast</label></li>
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
