import Block from 'block';
import Handlebars from '../../node_modules/handlebars/dist/cjs/handlebars';

function ConstructDomTree (Template: string, Properties: Record<string, string | Block>): Document {
  const template = Handlebars.compile(Template);

  const HTMLString = template(Properties);
  const parser = new DOMParser();
  const nodeStructure = parser.parseFromString(HTMLString, 'text/html');

  // Специальный механизм, позволяющий в шаблон добавлять "псевдо-теги" node для включения в DOM-дерево живые компоненты
  const nodes = nodeStructure.getElementsByTagName('node');
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (typeof (Properties[nodes[i].id]) === 'object') nodes[i].parentNode.insertBefore((<Block>Properties[nodes[i].id])._element, nodes[i]);
    nodes[i].remove();
  }

  return nodeStructure;
}

export {ConstructDomTree};
