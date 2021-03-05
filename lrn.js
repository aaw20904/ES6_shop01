
const GoodsItemConstructor = (function () {
  const m = new WeakMap();
  const secretObj = new Map();

  class GoodsItem {
    constructor () {
      let tmp;
      m.set(this, secretObj);
      secretObj.set('t1', '<source srcset="');
      secretObj.set('medium_img', 'undefined_medium.svg');
      tmp = '" media="(min-width: 365px)' +
       ' and (max-width: 800px)"><source srcset="';
      secretObj.set('t2', tmp);
      secretObj.set('small_img', 'undefined_small.svg');
      tmp = '" media=" (max-width: 364px)"><img src="';
      secretObj.set('t3', tmp);
      secretObj.set('big_img', 'undefined_big.svg');
      tmp = '" alt="MDN">' +
       '</picture>' + '<div class="title">';
      secretObj.set('t4', tmp);
      secretObj.set('title', 'TEMPLATE');
      tmp = '</div><div class="price">';
      secretObj.set('t5', tmp);
      secretObj.set('price', '$0.00');
      secretObj.set('t6', '</div>');
    }

    makeItem (id = 'id001', keyMap) {
      let tmpl = '';
      let iter;
      let result;
      try {
        if (!id) {
          throw new Error('Bad ID!');
        }
      } catch (x) {
        console.log(x);
      }
      /* copy a map */
      const obj = new Map(m.get(this));
      const elemForInsert = document.createElement('li');
      /* create an element */
      elemForInsert.setAttribute('class', 'goodsItem');
      /* if there a valid data */
      if (keyMap) {
        keyMap.forEach((val, key) => { obj.set(key, val); });
      }
      /* assemble a string */
      iter = obj.values();
      result = iter.next();
      while (!result.done) {
        tmpl += result.value;
        result = iter.next();
      }
      /* convert a text to a node and insert it */
      elemForInsert.insertAdjacentHTML('afterbegin', tmpl);
      elemForInsert.setAttribute('data-good-id', id);
      return elemForInsert;
    }
  }

  return GoodsItem;
})();

window.onload = function () {
  const container = document.querySelector('.goodsPanel');
  /* let template  = '<source srcset="' + 'bread_medium.jpg' + '" media="(min-width: 365px)'+
       ' and (max-width: 800px)">'+
       ' <source srcset="'+'bread_small.jpg'+'" media=" (max-width: 364px)">'+
       ' <img src="'+'bread_big.jpg'+'" alt="MDN">'+
        '</picture>'+
     '<div class="title">'+'TEMPLATE'+'</div>'+
     '<div class="price">'+'$00.0'+'</div>'; */
  let iter;
  let result;

  const myMap = new Map();
  const setOfNodes = new Set();
  myMap.set('price', '$100');
  myMap.set('title', 'first');

  const fabrica = new GoodsItemConstructor();
  setOfNodes.add(fabrica.makeItem('i1', myMap));
  myMap.set('title', 'second');
  setOfNodes.add(fabrica.makeItem('i2', myMap));
  myMap.set('title', 'thrid');
  setOfNodes.add(fabrica.makeItem('i3', myMap));
  iter = setOfNodes.entries();

  result = iter.next();
  while (!result.done) {
    container.appendChild(result.value[0]);
    result = iter.next();
  }
};
