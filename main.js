window.addEventListener('load', () => {
    bookShelf = JSON.parse(localStorage.getItem('bookShelf')) || [];

    displayTasks();
})

const addBook = document.querySelector('.addBook');
addBook.addEventListener('click', inputForm);

function inputForm() {
    const main = document.querySelector('main');
    const float_form = document.createElement('div');
        float_form.className = 'floating-form';
    const box = document.createElement('div');
        box.className = 'box';
    const form_title = document.createElement('h2');
        form_title.innerText = 'Form Buku Baru';
    
    const title_bg = document.createElement('div');
        title_bg.className = 'input-gradient-border';
    const title_field = document.createElement('div');
        title_field.className = 'input';
    const title_label = document.createElement('label');
        title_label.for = 'title';
        title_label.innerText = 'Judul';
    const title_input = document.createElement('input')
        title_input.className = 'new-book';
        title_input.id = 'title';
        title_input.name = 'title';
        title_input.type = 'text';
        title_input.placeholder = 'Judul';
        title_input.hasAttribute = 'required';
    title_bg.appendChild(title_input);
    title_field.appendChild(title_label);
    title_field.appendChild(title_bg);

    const author_bg = document.createElement('div');
        author_bg.className = 'input-gradient-border';
    const author_field = document.createElement('div');
        author_field.className = 'input';
    const author_label = document.createElement('label');
        author_label.for = 'author';
        author_label.innerText = 'Pengarang';
    const author_input = document.createElement('input')
        author_input.className = 'new-book';
        author_input.id = 'author';
        author_input.name = 'author';
        author_input.type = 'text';
        author_input.placeholder = 'Pengarang';
        author_input.hasAttribute = 'required';
    author_bg.appendChild(author_input);
    author_field.appendChild(author_label);
    author_field.appendChild(author_bg);

    const year_bg = document.createElement('div');
        year_bg.className = 'input-gradient-border';
    const year_field = document.createElement('div');
        year_field.className = 'input';
    const year_label = document.createElement('label');
        year_label.for = 'year';
        year_label.innerText = 'Tahun';
    const year_input = document.createElement('input')
        year_input.className = 'new-book';
        year_input.id = 'year';
        year_input.name = 'year';
        year_input.type = 'number';
        year_input.placeholder = 'Tahun';
        year_input.hasAttribute = 'required';
    year_bg.appendChild(year_input);
    year_field.appendChild(year_label);
    year_field.appendChild(year_bg);
    
    const cb_field = document.createElement('div');
        cb_field.classList.add('input');
        cb_field.classList.add('input-inline');
    const cb_input = document.createElement('input');
        cb_input.classList.add('new-book');
        cb_input.classList.add('pointer');
        cb_input.id = 'baca';
        cb_input.name = 'completed';
        cb_input.type = 'checkbox';
        cb_input.value = 'false';
    const cb_label = document.createElement('label');
        cb_label.for = 'baca';
        cb_label.className = 'pointer';
        cb_label.innerText = 'Selesai dibaca';
    cb_field.appendChild(cb_input);
    cb_field.appendChild(cb_label);

    const btn = document.createElement('button');
        btn.className = 'pointer';
        btn.classList.add('btn');
        btn.id = 'bookSubmit';
        btn.type = 'submit';
        btn.innerText = 'Tambah Buku';

    const exitBtn = document.createElement('button');
        exitBtn.innerText = 'Batal';
        exitBtn.className = 'btn';
        exitBtn.classList.add('cancel');
        exitBtn.classList.add('pointer');
        exitBtn.addEventListener('click', () => {
            main.removeChild(float_form)
        })
    const form = document.createElement('form');
        form.id = 'inputBook';
    form.appendChild(form_title);
    form.appendChild(title_field);
    form.appendChild(author_field);
    form.appendChild(year_field);
    form.appendChild(cb_field);
    form.appendChild(btn);
    box.appendChild(form);
    box.appendChild(exitBtn);
    float_form.appendChild(box);
    main.appendChild(float_form);

    const cb = document.getElementById('baca');
    cb.addEventListener('click', () => {
        if(cb.value == "true") cb.value = "false";
        else cb.value = "true";
    })

    const newBook = document.getElementById('inputBook');
    newBook.addEventListener('submit', e => {
        e.preventDefault();
        const books = {
            id: Date.now(),
            title: e.target.title.value,
            author: e.target.author.value,
            year: e.target.year.value,
            isComplete: (e.target.completed.value === 'true')
        };
        cb.value = 'false';

        bookShelf.push(books);

        localStorage.setItem('bookShelf', JSON.stringify(bookShelf));

        main.removeChild(float_form);

        displayTasks();
    });
}

function displayTasks() {
    const sudahDibaca = document.getElementById('sudah');
    const belumDibaca = document.getElementById('belum');
    
    sudahDibaca.innerHTML = '';
    belumDibaca.innerHTML = '';
    if(Array.isArray(bookShelf)){
        bookShelf.forEach(books => {
            const bookItem_bg = document.createElement('div');
            const bookItem = document.createElement('div');
            const bookText = document.createElement('div');
            const title = document.createElement('h3');
            const bookDetail = document.createElement('div');
            const author = document.createElement('p');
            const year = document.createElement('p');
            const action = document.createElement('div');
            const doneBtn = document.createElement('button');
            const undoneBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');
            
            bookItem_bg.classList.add('bookItem-bg');
            bookItem.classList.add('bookItem');
            bookText.classList.add('bookText');
            bookDetail.classList.add('bookDetail');
            action.classList.add('action');
            doneBtn.classList.add('sudahBaca');
            undoneBtn.classList.add('belumBaca');
            deleteBtn.classList.add('hapus');
            
            title.innerHTML = `${books.title}`;
            author.innerHTML = `${books.author}`;
            year.innerHTML = `- ${books.year}`;

            doneBtn.innerHTML = '<i class="ti ti-check" width="24" height="24"></i>';
            undoneBtn.innerHTML = '<i class="ti ti-x" width="24" height="24"></i>';
            deleteBtn.innerHTML = '<i class="ti ti-trash" width="24" height="24"></i>';

            bookDetail.appendChild(author);
            bookDetail.appendChild(year);
            bookText.appendChild(title);
            bookText.appendChild(bookDetail);
            bookItem.appendChild(bookText);
            bookItem.appendChild(action);
            bookItem_bg.appendChild(bookItem);
            
            if(books.isComplete) {
                action.appendChild(undoneBtn);
                action.appendChild(deleteBtn);
                sudahDibaca.appendChild(bookItem_bg);
            }
            else {
                action.appendChild(doneBtn);
                action.appendChild(deleteBtn);
                belumDibaca.appendChild(bookItem_bg);
            }

            doneBtn.addEventListener('click', e => {
                temp = !books.isComplete;
                books.isComplete = temp;
                localStorage.setItem('bookShelf', JSON.stringify(bookShelf));
                displayTasks();     
            });

            undoneBtn.addEventListener('click', e => {
                temp = !books.isComplete;
                books.isComplete = temp;
                localStorage.setItem('bookShelf', JSON.stringify(bookShelf));
                displayTasks();     
            });
            
            deleteBtn.addEventListener('click', e => {
                let confirm = confirmPage(books);
                console.log(confirm);
            });

            // deleteBtn.addEventListener('click', confirmPage(books));

        });
    }
}

async function confirmPage(books) {
    const cf = await confirmPopup();
    if(cf) {
        bookShelf = bookShelf.filter( b => b != books);
        localStorage.setItem('bookShelf', JSON.stringify(bookShelf));
        displayTasks();
    }
}

const confirmPopup = () => {
    return new Promise((resolve, reject) => {
        const main = document.querySelector('main');
        const float_form = document.createElement('div')
        float_form.className = 'floating-form';
        float_form.id = 'confirm-form';
        const box = document.createElement('div');
        box.className = 'box';
        const text = document.createElement('h2');
        text.innerText = `Yakin hapus?`;
        const input = document.createElement('div');
        input.className = 'input';
        input.classList.add('input-inline')
        const buttonYes = document.createElement('input')
        buttonYes.type = 'button';
        buttonYes.className = 'hapus';
        buttonYes.value = 'Hapus'
        const buttonNo = document.createElement('input')
        buttonNo.type = 'button';
        buttonNo.className = 'sudahBaca';
        buttonNo.value = 'Batal'

        input.appendChild(buttonYes);
        input.appendChild(buttonNo);
        box.appendChild(text);
        box.appendChild(input);
        float_form.appendChild(box);
        main.appendChild(float_form);
        
        buttonYes.onclick = ()=> {
            main.removeChild(float_form);
            resolve(true);
        };
        
        buttonNo.onclick = () => {
            main.removeChild(float_form);
            reject(false);
        };
    })
}
