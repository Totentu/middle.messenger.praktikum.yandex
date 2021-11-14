import Block from 'block';
import {router} from '../index';
import HTTPTransport from './httptransport';

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

function ExecuteApiSubmit (InBut: Block, InData: TProps) : void {
  const HTTP = new HTTPTransport();
  const host = 'https://ya-praktikum.tech';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  HTTP[InBut.props.apiMethod](`${host}/api/v2${InBut.props.apiKey}`, {
    data: InData
  })
    .then(
      (data: XMLHttpRequest) => {
        if (data.status === 200) {
          router.go(InBut.props.href);
        } else {
          if (data.responseText === '{"reason":"User already in system"}') {
            router.go(InBut.props.href);
          } else {
            alert(`${data.status}: ${data.responseText}`);
          }
        }
      }
    );
}

function submitControl (inForm: Block): void {
  if (this.props.type === 'submit') {
    let flagReady = true;
    for (const node of inForm.props['fieldsNodes']) {
      const readyField = getCorrectValue.bind(inForm.props.nodeElements[node.field_name])(node.regControl, node.errMes);
      flagReady = flagReady && readyField;
    }
    if (flagReady) {
      if (typeof (this.props.href) !== 'undefined' && this.props.href !== '') {
        ExecuteApiSubmit(this, GetBodyForm(inForm));
      }
    }
  } else {
    if (typeof (this.props.href) !== 'undefined' && this.props.href !== '') {
      if (this.props.apiKey) {
        ExecuteApiSubmit(this, GetBodyForm(inForm));
      } else {
        router.go(this.props.href);
      }
    }
  }
}

function GetBodyForm (inForm: Block): TProps {
  const sendBody: TProps = {};
  if (inForm.props['fieldsNodes']) {
    for (const node of inForm.props['fieldsNodes']) {
      const ne = inForm.props.nodeElements[node.field_name];
      sendBody[node.field_name] = ne.element.value;
    }
  }
  if (sendBody.users) {
    sendBody.users = [sendBody.users];
  }
  console.log(sendBody);
  return sendBody;
}

function GetCookie (name: string) : string | null {
  const arg = name + '=';
  const alen = arg.length;
  const clen = document.cookie.length;
  let i = 0;
  while (i < clen) {
    const j = i + alen;
    if (document.cookie.substring(i, j) === arg) { return getCookieVal(j); }
    i = document.cookie.indexOf(' ', i) + 1;
    if (i === 0) break;
  }
  return null;
}

function getCookieVal (offset: number) {
  let Instr = document.cookie.indexOf(';', offset);
  if (Instr === -1) Instr = document.cookie.length;
  return unescape(document.cookie.substring(offset, Instr));
}

function SetCookie (name: string, value: string): void {
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}

export {getCorrectValue, submitControl, GetCookie, SetCookie};
