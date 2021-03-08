let  DataService = (function(){
  let accessor = new WeakMap();
  let privObj = new Map();
 

  class dataService{
    constructor () {
      accessor.set (this, privObj);
    }

    insertPair (k,v) {
      let priv = accessor.get(this);
      priv.set (k, v);
    }

    getData (q) {
      let priv = accessor.get(this);
          setTimeout(()=>{return(priv.get(q)) },1000);
    }

    getInterface () {
      return {exec:this.getData, context:this};
    }
  }
return dataService

})();



/********************************************** */

let ItemsTextNodesGetter = (function(){
  /*a secret member*/
  let priv = {

    links: new Set(['medium',"small","big","title","price"]),
    [Symbol.iterator](z){

      /* FIRSTLY  - get a UL ode,
      SECONDLY - get an li node by attribute [attr= ...]  QuerySelector()
      THIRDLY - get a specified sumitem i.e. title, price etc */
      /*get a list node*/
        let parent = document.querySelector('.goodsPanel');
        /*get a concrete item*/
        parent = parent.querySelector('[data-good-id=' + z + ']');
        if(!parent){
          return {value:null, done:true}
        }
        let iter = this.links.entries();
        let res = iter.next();
        let tmp; 
        let textNode;
        return{
            next: function () {
              if (!res.done) {
                  console.log(new Date().toTimeString());
                  tmp = res;
                  /*checking^ is there an image attributes*/
                  switch (tmp.value[0]) {
                   case 'medium':
                    textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                    return {value:{key:tmp.value[0], command: (x)=>{textNode.setAttribute('srcset',x)}},done:false}
                   break;
                   case 'small':
                    textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                    return {value:{key:tmp.value[0], command: (x)=>{textNode.setAttribute('srcset',x)}},done:false}
                   break;
                   case 'big':
                    textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                    return {value:{key:tmp.value[0], command: (x)=>{textNode.setAttribute('src',x)}},done:false}
                   break;
                  }
                  res = iter.next();
                  textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                  return {value: {id:tmp.value[0], command:(x)=>{ textNode.innerText = x}}, done: false};
              } else {
                return {value: undefined, done :true};
              }
           }
       }
    }
 }

let m = new WeakMap();
   
   class myClass {
       constructor () {
        m.set (this, priv);
       }
       getIterFieldsOfNodeByID (id) {
        let obj = m.get(this);
        return obj[Symbol.iterator](id);
       }
  }
 return myClass;

})();

/*********************************************** */


let ItemsIteratorCreator = (function(){
   let m =new WeakMap();
   let privMembers = {
     [Symbol.iterator] () {
       
     }
   }
})();




const GoodsItemConstructor = (function () {
  const m = new WeakMap();
  const secretObj = new Map();

  class GoodsItem {
    constructor () {
      let tmp;
      m.set(this, secretObj);
      secretObj.set('t1', '<source data-items-g="medium" srcset="');
      secretObj.set('medium_img', 'undefined_medium.svg');
      tmp = '" media="(min-width: 365px)' +
       ' and (max-width: 800px)"><source data-items-g="small" srcset="';
      secretObj.set('t2', tmp);
      secretObj.set('small_img', 'undefined_small.svg');
      tmp = '" media=" (max-width: 364px)"><img data-items-g="big" src="';
      secretObj.set('t3', tmp);
      secretObj.set('big_img', 'undefined_big.svg');
      tmp = '" alt="MDN">' +
       '</picture>' + '<div class="title" data-items-g="title">';
      secretObj.set('t4', tmp);
      secretObj.set('title', 'TEMPLATE');
      tmp = '</div><div class="price" data-items-g="price">';
      secretObj.set('t5', tmp);
      secretObj.set('price', '$0.00');
      secretObj.set('t6', '</div>');
    }

    makeItem (id = 'id001') {
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


let ListMgr = (function(){

 let m = new WeakMap();
 
 let hideObj = {
   listOfID: new Set(),
   fabrica: new GoodsItemConstructor(),
   insertItem: (node, listener)=>{
     let parent = document.querySelector('.goodsPanel');
     let newAttr = node.getAttribute ('data-good-id');
        /* embed a node into the DOM*/
        parent.appendChild (node);
        /*bind to an event listener*/
        node.addEventListener ('click', listener, false);
   },

   

   removeItem: (id, listener)=>{
    let node =ListMgr.getNodeByID (id);
      /*unbind to an event listener*/
       node.removeEventListener('click', listener);
       /*othervise - remove a node from the DOM*/
       node.parentElement.removeChild(node);
   },

   updateItem: (id, mapData)=>{
    let node = ListMgr.getNodeByID (id);
  
   }

  }

  class ListMgr  {
     constructor (subscriber, serviceInterface) {
        /*init a weakMap for access to private members*/
        m.set(this, hideObj);
       /*on click handler*/ 
       this.subscriber = subscriber;
       /*a service interface  to query an info about goods*/
       this.serviceInterface = serviceInterface;
     }

     static getNodeByID (id) {
      let parent = document.querySelector ('.goodsPanel');
      return parent.querySelector ('[data-good-id="' + id + '"]');
     }
     
     isInDOM (id) {
      let parent = document.querySelector('.goodsPanel');
      return parent.querySelector('[data-good-id="'+ id +'"]') ? true : false;
     }

     insertNode (idOfNode) {
       let privObj = m.get(this);
        /*checking - is a noode in DOM?*/
        if (this.isInDOM(idOfNode)) {
          return -1;
        } else {
          /*insert a key in a set*/
          privObj.listOfID.add(idOfNode);
          /*create a new node*/
          let newNode = privObj.fabrica.makeItem(idOfNode);
          /*insert into DOM*/
          privObj.insertItem(newNode, this.subscriber);
        } 
     }

     removeNode (idOfNode) {
      let privObj = m.get(this);
      /*checking - is a noode in DOM?*/
      if (!this.isInDOM(idOfNode)) {
        return -1;
      } else {
         /*remove a key from a set*/
         privObj.listOfID.delete(idOfNode);
        /*remove from DOM*/
        privObj.removeItem(idOfNode, this.subscriber);
      } 
     }

  }
return ListMgr;

})();

function Ext01 () {
  let obj = {};
  return {
    insertPair: function (k,v){
      obj[k]=v;
    },
    getData: function (k) {
      return obj[k];
    }
  }
}

class myClass {
  constructor(x){
    this.method = x;
  }
  run (id) {
   console.log(this.method(id));
  }
}

function onClick (evt) {
  alert(new Date().toLocaleTimeString());
}

window.onload = function () {
  let dService1 = new  DataService();
  dService1.insertPair('id001',new Map([['price',10.5],['title','Bread']]));
  dService1.insertPair('id002',new Map([['price',15.0],['title','Baton']]));
// let z001 = new myClass(dService1.getInterface());
 //z001.run('id001');
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
  let mgr = new ListMgr(onClick, dService1.getInterface());
  mgr.insertNode('id001');

  let testInst = new ItemsTextNodesGetter();
  let it1 = testInst.getIterFieldsOfNodeByID('id001');
  let tmp001 = it1.next();
  tmp001.value.command('test1');
  tmp001 = it1.next();
  tmp001.value.command('test2');
  tmp001 = it1.next();
  tmp001.value.command('test3');
  tmp001 = it1.next();
  tmp001.value.command('test4');
 // mgr.removeNode('id001');

};
