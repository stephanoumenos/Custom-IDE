# Custom-IDE

## Installation Steps

<ol>
<li><code>yarn install</code> in <i>API/</i> and <i>UI/</i> </li>
<li><code>yarn start</code> in <i>UI/</i></li>
<li><code>node index.js</code> in <i>API/</i></li>
</ol>

## Try it
Once the client and server are running, upload your grammar (mock grammar available in <i>UI/lang/</i>) and click the upload button.

A new folder should be created under <i>API/tmp/grammarName</i>. 

The created folder should contain your grammar as well as the generated lexer and parser in TypeScript (among other files).
