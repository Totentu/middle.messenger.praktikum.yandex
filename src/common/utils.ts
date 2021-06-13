import Block from 'block';
import Handlebars from '../../node_modules/handlebars/dist/cjs/handlebars';

function ConstructDomTree (Template: string, Properties: ProxyConstructor): Document {
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

function GetCorrectValue (inRegExp: RegExp, inErrMes: string): boolean {
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

function SubmitControl (inForm: Block): void {
  if (this.props.type === 'submit') {
    let flagReady = true;
    for (const node of inForm.props.fields) {
      const readyField = GetCorrectValue.bind(inForm.props[node.field_name])(node.regControl, node.errMes);
      flagReady = flagReady && readyField;
    }
    if (flagReady) {
      if (typeof (this.props.href) !== 'undefined' && this.props.href !== '') window.location = this.props.href;
    }
  } else {
    if (typeof (this.props.href) !== 'undefined' && this.props.href !== '') window.location = this.props.href;
  }
}

export {ConstructDomTree, GetCorrectValue, SubmitControl};
