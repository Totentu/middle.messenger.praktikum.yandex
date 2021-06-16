import Block from 'block';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Handlebars from '../../node_modules/handlebars/dist/cjs/handlebars';

type TPropertyValue = any;
type TProps = Record<string, TPropertyValue>;

function constructDomTree (Template: string, Properties: TProps): Document {
  const template = Handlebars.compile(Template);

  const HTMLString = template(Properties);
  const parser = new DOMParser();
  const nodeStructure = parser.parseFromString(HTMLString, 'text/html');

  // Специальный механизм, позволяющий в шаблон добавлять "псевдо-теги" node для включения в DOM-дерево живые компоненты
  const nodes = nodeStructure.getElementsByTagName('node');
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (typeof (Properties[nodes[i].id]) === 'object') {
      nodes[i]?.parentNode?.insertBefore((<Block>Properties[nodes[i].id]).element, nodes[i]);
    } else if (typeof (Properties?.nodeElements) === 'object') {
      if (typeof (Properties?.nodeElements[nodes[i].id]) === 'object') {
        nodes[i]?.parentNode?.insertBefore((<Block>Properties?.nodeElements[nodes[i].id]).element, nodes[i]);
      }
    }
    nodes[i].remove();
  }

  return nodeStructure;
}

function getCorrectValue (inRegExp: RegExp, inErrMes: string): boolean {
  if (typeof (inRegExp) === 'undefined') return true;
  const res = inRegExp.test(this.element.value);
  if (res) {
    this.props.control.setProps({textContent: ''});
    this.props.control.hide();
  } else {
    this.props.control.setProps({textContent: inErrMes});
    this.props.control.show();
  }
  return res;
}

function submitControl (inForm: Block): void {
  if (this.props.type === 'submit') {
    let flagReady = true;
    for (const node of inForm.props['fieldsNodes']) {
      const readyField = getCorrectValue.bind(inForm.props.nodeElements[node.field_name])(node.regControl, node.errMes);
      flagReady = flagReady && readyField;
    }
    if (flagReady) {
      if (typeof (this.props.href) !== 'undefined' && this.props.href !== '') window.location = this.props.href;
    }
  } else {
    if (typeof (this.props.href) !== 'undefined' && this.props.href !== '') window.location = this.props.href;
  }
}

export {constructDomTree, getCorrectValue, submitControl};
