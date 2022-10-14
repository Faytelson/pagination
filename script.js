const listParent = document.querySelector(".card-list"),
    paginationParent = document.querySelector(".pagination__list");

// classes
class Elem {
    constructor(parent, className, title, date, description) {
        this.parent = parent;
        this.className = className;
        this.title = title;
        this.date = date;
        this.description = description;
        this.inner = `
             <h2 class="card__title">${this.title}</h2>
             <h2 class="card__date">${this.date}</h2>
             <div class="card__description">${this.description}</div>
         `;
    }

    render() {
        let elem = document.createElement('div');
        elem.classList.add(this.className);
        elem.innerHTML = this.inner;
        this.parent.append(elem);
    }
}

class Link extends Elem {
    constructor(parent, className, inner) {
        super(parent, className);
        this.parent = parent;
        this.className = className;
        this.inner = inner;
    }
}

// callbacks
function displayLinks(array) {
    for (let i = 1; i < array.length - 1; i++) {
        new Link(paginationParent, 'pagination__link', i).render();
    }
}

function displayCards(array) {
    listParent.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        new Elem(listParent, 'card', array[i].name, array[i].date, array[i].description).render();
    }
}

function fetchPages(i) {
    let promise2 = fetch(`http://candidate.scid.ru/api/books?page=${i + 1}`)
        .then(response => response.json())
        .then(pageData => {
            displayCards(pageData.result.data);
        });
}

// fetch
fetch(`http://candidate.scid.ru/api/books`)
    .then(response => response.json())
    .then(data => {
        displayLinks(data.result.links);
        displayCards(data.result.data);
        const links = document.querySelectorAll(".pagination__link");
        links.forEach((link, index) => {
            link.addEventListener('click', function (evt) {
                fetchPages(index);
            });
        })
    });
