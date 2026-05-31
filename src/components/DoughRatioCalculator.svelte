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

<style>
  #dough-ratio-calculator {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 1em 3em;
    padding: 1.25em 1.75em;
    border: 1px solid rgba(128, 128, 128, 0.35);
    border-radius: 0.75em;
    background-color: rgba(128, 128, 128, 0.07);
    font-family: var(--font-family-sans, sans-serif);
    margin: 1.5em 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.6em;
  }

  input[type="number"] {
    width: 4.5em;
    text-align: right;
    padding: 0.2em 0.4em;
    border: 1px solid rgba(128, 128, 128, 0.5);
    border-radius: 0.3em;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  table {
    border-collapse: collapse;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
  }

  caption {
    font-weight: 600;
    padding-bottom: 0.4em;
    text-align: center;
  }

  td {
    padding: 0.3em 0.6em;
    border-bottom: 1px solid rgba(128, 128, 128, 0.25);
    word-break: normal;
  }

  td:first-child {
    text-align: right;
  }

  p {
    margin: 0;
    text-align: center;
  }

  strong {
    display: block;
    margin-bottom: 0.3em;
  }
</style>
