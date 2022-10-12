const listParent = document.querySelector(".card-list"),
    paginationParent = document.querySelector(".pagination__list");
let paginatedItems,
    itemsPerPage = 2;

class Link {
    constructor(index, parent) {
        this.index = index;
        this.parent = parent;
    }

    render() {
        let link = document.createElement('a');
        link.classList.add('pagination__link');
        link.innerHTML = this.index + 1;
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

let promise = fetch("http://candidate.scid.ru/api/books?page=1")
    .then(response => response.json())
    .then(data => {
        displayCards(data.result.data.slice(0, itemsPerPage));
        for (let i = 0; i < data.result.data.length / itemsPerPage; i++) {
            new Link(i, paginationParent).render();
        }
        const links = document.querySelectorAll(".pagination__link");
        links.forEach((link, index) => {
            link.addEventListener('click', function (evt) {
                evt.preventDefault();
                let start = index * itemsPerPage;
                let end = start + itemsPerPage;
                paginatedItems = data.result.data.slice(start, end);
                displayCards(paginatedItems);
            })
        })
    });

function displayCards(array) {
    listParent.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        new Card(array[i].name, array[i].date, array[i].description, listParent).render();
    }
}



