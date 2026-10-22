const fs = require('fs');
const content = fs.readFileSync('public/src/app/modules/employee/my-team/my-team.page.html', 'utf8');

// remove comments across multiple lines
const noComments = content.replace(/<!--[\s\S]*?-->/g, (match) => {
  return match.split('\n').map(() => '').join('\n');
});

const lines = noComments.split('\n');
let stack = [];
let voidTags = new Set(['img', 'input', 'hr', 'br', 'source', 'link', 'meta']);

const tagRegex = /<!--[\s\S]*?-->|<!--|-->|<(\/)?([a-zA-Z0-9-]+)((?:\s+[^>]*)?)\/?>/g;
let match;
while ((match = tagRegex.exec(content)) !== null) {
  const full = match[0];
  if (full.startsWith('<!--')) continue;
  const isClosing = match[1] === '/';
  const tag = match[2].toLowerCase();
  const rest = match[3] || '';
  const isSelfClosing = full.endsWith('/>') || voidTags.has(tag);

  const lineNumber = content.substring(0, match.index).split('\n').length;

  if (isSelfClosing && !isClosing) {
    continue;
  }

  if (isClosing) {
    if (stack.length === 0) {
      console.log(`Line ${lineNumber}: Unexpected closing tag </${tag}>`);
    } else {
      const top = stack.pop();
      if (top.tag !== tag) {
        console.log(`Line ${lineNumber}: Mismatched closing tag </${tag}>, expected </${top.tag}> (opened at line ${top.line})`);
      }
    }
  } else {
    stack.push({ tag, line: lineNumber, raw: full.substring(0, 40) });
  }
}

if (stack.length > 0) {
  console.log('Unclosed tags remaining:', stack);
} else {
  console.log('All tags matched and balanced!');
}
