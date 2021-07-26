/* 
*   Let's build an Accordeon widget with structure:
*   
*   <div class="myAccordeon">
*       <div class="myAccordeon__item">
*           <div class="myAccordeon__title">
*               <span class="myAccordeon__title--text"></span>
*               <span class="myAccordeon__title--chevron"></span>
*           </div>
*           <div class="myAccordeon__content">
*               ...
*           </div>
*       </div>
*   </div>
config: {
    element: target element,
    items: [ { title: '...', content: '...'} ]
}
*/
class myAccordeon {
    constructor(config) {
        this.config = config;
        this.myAcc = null;
        this.render();
    }

    render() {
        this.myAcc = document.createElement('div');
        this.myAcc.setAttribute('class', 'myAccordeon');

        for(let item of this.config.items) {
            this.myAcc.appendChild(
            this.renderItem(item));
        }
        this.config.element.appendChild(this.myAcc)
    }
    renderItem(item) {
        let accItem = document.createElement('div'),
            accTitle = document.createElement('div'),
            accContent = document.createElement('div'),
            opened = item.opened ? '' : 'hidden',
            chevron = item.opened ? 'chevron-up' : 'chevron-down';

        accItem.setAttribute('class', 'myAccordeon__item'); 
        accTitle.setAttribute('class', 'myAccordeon__title'); 
        accTitle.innerHTML = ` 
            <span class="myAccordeon title--text">${item.title}</span> 
            <span class="myAccordeon__title--chevron ${chevron}"></span>`;
        accContent.setAttribute('class', `myAccordeon__content ${opened}`); 
        accContent.innerText = item.content;
        accItem.appendChild(accTitle);
        accItem.appendChild(accContent);
        this.addEvent(accItem);

        return accItem;
    }
    addEvent(item) {
        let title = item.querySelector('.myAccordeon__title');
        let content = item.querySelector('.myAccordeon__content');

        title.addEventListener('click', e => {
        console.log('click', title.innerText);
        this.closeAll();
        let chevron = title.querySelector('.myAccordeon__title--chevron');
        chevron.classList.toggle('chevron-down');
        chevron.classList.toggle('chevron-up');
        content.classList.toggle('hidden');
        });
    }
    closeAll() {
        this.myAcc.querySelectorAll('.myAcordeon__item');
        this.myAcc.querySelectorAll('.myAccordeon__content').forEach(body => {
            body.classList.add('hidden');
        });
        this.myAcc.querySelectorAll('.myAccordeon__title--chevron').forEach(elem => {
            elem.classList.remove('chevron-up');
            elem.classList.add('chevron-down');
        });
    }
}
    
window.onload = () => {
    console.log('app started.');
    new myAccordeon({
        element: document.getElementById('container1'),
        items: [
            {title: 'First Title', content: 'First content text', opened: true },
            {title: 'Second Title', content: 'Second content text'},
            {title: 'Third Title', content: 'Third content text'},
            {title: 'Forth Title', content: 'Forth content text'}
        ]
    }) 
}

