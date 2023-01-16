const el = (tag = 'div', attrs = {}, children = [], listeners = {}) => {
    children = [].concat(children);

    const elem = document.createElement(tag);

    for (const [eventName, callback] of Object.entries(listeners))
        elem.addEventListener(eventName, callback);

    if (typeof attrs === 'string') elem.className = attrs;
    else
        for (const [key, value] of Object.entries(attrs))
            elem.setAttribute(key, value);

    elem.append(...children);

    return elem;
};

const elDiv = el.bind(null, 'div');

const createSlider = (items) => {
    const bullets = items.map((_, i) =>
        elDiv('slider__bullet', [], { click: moveTo.bind(null, i) })
    );

    const container = elDiv(
        'slider__container',
        items.map((elem) => elDiv('slider__container-item', elem))
    );

    const slider = elDiv(
        { tabindex: '0', class: 'slider' },
        [
            container,
            elDiv('slider__bullets', bullets),
            elDiv('slider__nav', [
                elDiv('slider__nav-button slider__nav-button_side_left', [], {
                    click: stepTo.bind(null, -1),
                }),
                elDiv('slider__nav-button slider__nav-button_side_right', [], {
                    click: stepTo.bind(null, 1),
                }),
            ]),
        ],
        {
            keydown: (e) => {
                if (e.key === 'ArrowLeft') return stepTo(-1);
                if (e.key === 'ArrowRight') return stepTo(1);
            },
        }
    );

    const getIndex = () => Number(slider.dataset.index);
    const setIndex = (idx) => (slider.dataset.index = idx);

    let activeBullet;
    function moveTo(index) {
        setIndex(index);

        activeBullet?.classList.remove('slider__bullet_active');

        activeBullet = bullets[index];
        activeBullet.classList.add('slider__bullet_active');

        container.style.transform = `translate(-${100 * index}%)`;
    }

    function stepTo(diff) {
        let index = getIndex();

        if (index + diff >= items.length) index = 0;
        else if (index + diff < 0) index = items.length - 1;
        else index += diff;

        moveTo(index);
    }

    moveTo(0);

    return slider;
};

document.body.append(
    createSlider(
        [
            'img/1.jpeg',
            'img/2.jpg',
            'img/3.jpg',
            'img/4.jpg',
            'img/5.png',
            'img/6.jpg',
        ].map((src) => el('img', { src, style: 'width: 500px' }))
    ),
    createSlider(
        [
            ['img/1.jpeg', 'img/2.jpg', 'img/3.jpg'],
            ['img/4.jpg', 'img/5.png', 'img/6.jpg'],
        ].reduce(
            (acc, imgs) =>
                acc.concat(
                    elDiv(
                        'img-list',
                        imgs.map((src) => el('img', { src }))
                    )
                ),
            []
        )
    )
);
