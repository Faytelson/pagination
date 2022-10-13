const listParent = document.querySelector(".card-list"),
    paginationParent = document.querySelector(".pagination__list");
let paginatedItems,
    itemsPerPage = 2;

// classes
class Link {
    constructor(index, parent) {
        this.index = index;
        this.parent = parent;
    }

    render() {
        let link = document.createElement('a');
        link.classList.add('pagination__link');
        link.innerHTML = this.index;
        this.parent.append(link);
    }
}

class Card {
    constructor(title, date, description, parent) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.parent = parent;
    }

    render() {
        let listItem = document.createElement('div');
        listItem.classList.add('card');
        listItem.innerHTML = `
            <h2 class="card__title">${this.title}</h2>
            <h2 class="card__date">${this.date}</h2>
            <div class="card__description">${this.description}</div>
        `;
        this.parent.append(listItem);
    }
}

// fetch
fetch(`http://candidate.scid.ru/api/books`)
    .then(response => response.json())
    .then(data => {
        for (let i = 1; i < data.result.links.length - 1; i++) {
            new Link(i, paginationParent).render();
        }
        displayCards(data.result.data);
        const links = document.querySelectorAll(".pagination__link");
        links.forEach((link, index) => {
            link.addEventListener('click', function (evt) {
                evt.preventDefault();
                fetchPages(index);
            });
        })
    });

// callbacks
function displayCards(array) {
    listParent.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        new Card(array[i].name, array[i].date, array[i].description, listParent).render();
    }
}

function fetchPages(i) {
    let promise2 = fetch(`http://candidate.scid.ru/api/books?page=${i + 1}`)
        .then(response => response.json())
        .then(pageData => {
            displayCards(pageData.result.data);
        });
}


