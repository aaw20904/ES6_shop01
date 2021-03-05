window.onload = function () {
    let container = document.querySelector(".goodsPanel");
    let template  = '<source srcset="' + 'bread_medium.jpg' + '" media="(min-width: 365px)'+
        ' and (max-width: 800px)">'+
        ' <source srcset="'+'bread_small.jpg'+'" media=" (max-width: 364px)">'+
        ' <img src="'+'bread_big.jpg'+'" alt="MDN">'+
         '</picture>'+
      '<div class="title">'+'TEMPLATE'+'</div>'+
      '<div class="price">'+'$00.0'+'</div>';
    let elemForInsert = document.createElement('li');
    /*create an element*/
    elemForInsert.setAttribute('class','goodsItem');
    /*insert content into the one*/
    elemForInsert.insertAdjacentHTML('afterbegin',template);
    elemForInsert.setAttribute('data-good-id','id001');
    container.appendChild(elemForInsert);
          
        
}

let GoodsItemConstructor = {
    let m = new WeakMap();
    let secretObj = {
       t1:'<source srcset="',
        medium_img:'bread_medium.jpg',
     t2:'" media="(min-width: 365px)'+
        ' and (max-width: 800px)">'+
        ' <source srcset="',
     small_img:'bread_small.jpg',
     t3: '" media=" (max-width: 364px)">'+
        ' <img src="',
     big_img: 'bread_big.jpg',
     t4: '" alt="MDN">'+
         '</picture>'+
      '<div class="title">',
    title: 'TEMPLATE',
    t5:'</div>'+
      '<div class="price">',
    price = '$00.0',
    t6 = '</div>',
     }

    class GoodsItem{
        Constructor () {
       m.set(this, secretObj);        
    }
    
    makeItem () {
         let tmpl;
        let obj = m.get(this); 
       let elemForInsert  = document.createElement('li');
        /*create an element*/
    elemForInsert.setAttribute('class','goodsItem');
 tmpl=obj[t1]+obj[medium_img]+obj[t2]+obj[small_img]+obj[t3]+obj[big_img]+obj[t4]+obj[title]+obj[t5]+obj[price]+obj[t6];
    /*insert content into the one*/
    elemForInsert.insertAdjacentHTML('afterbegin',tmpl);
    elemForInsert.setAttribute('data-good-id','id001');
        return elemForInsert;
    }
  }

return GoodsItem;

}