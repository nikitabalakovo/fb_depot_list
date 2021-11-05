(() => {
    'use strict';
    let depots = [
        // Example
        /*
        {
            'name': 'rta',
            'groupId': '333',
            'active': true,
            'title': { 'ru': 'Roads and Transport Authority', 'en': 'Roads and Transport Authority' },
            'body': { 'ru': '<table border="0"> <tbody> <tr> <td> <img src="https://shots.hoilik.com/fotobus/rta.png" width="100" style="margin: 15px 15px 15px 0;"> </td> <td> </td> <td> <small> <b>Roads and Transport Authority</b> является единственным городским перевозчиком в городе Дубай. Обслуживает так же пригородные и междугородние маршруты. Компания имеет 6 автобусных депо и более 2000 автобусов <br> <a href="https://www.rta.ae">rta.ae</a> </small> </td> </tr> </tbody> </table>', 'en': '<table border="0"> <tbody> <tr> <td> <img src="https://shots.hoilik.com/fotobus/rta.png" width="100" style="margin: 15px 15px 15px 0;"> </td> <td> </td> <td> <small> <b>Roads and Transport Authority</b> is the only urban carrier in Dubai. It serves also suburban and intercity routes. The company has 6 bus depots and more than 2000 buses <br> <a href="https://www.rta.ae">rta.ae</a> </small> </td> </tr> </tbody> </table>' },
            'buttonOpen': { 'ru': 'Развернуть список депо', 'en': 'Unroll depot list' },
            'buttonClose': { 'ru': 'Cвернуть список депо', 'en': 'Roll up depot list' }
        },
        {
            'name': 'staff',
            'groupId': '341',
            'active': true,
            'title': { 'ru': 'Служебные автобусы Дубая', 'en': 'Staff buses Dubai' },
            'buttonOpen': { 'ru': 'Развернуть список предприятий', 'en': 'Unroll facilities list' },
            'buttonClose': { 'ru': 'Cвернуть список предприятий', 'en': 'Roll up facilities list' }
        }
        */
    ];
    function go() {
        document.body.appendChild(document.createElement('style')).innerHTML = '.hidden-depot { position: absolute !important; max-height: 0px !important; max-width: 0px !important; overflow: hidden !important; }';
        function getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        let lang = getCookie('lang') ?? 'ru';
        function getTranslation(obj, param, isOptional) {
            return (obj[param] ? ((obj[param][lang] ?? (['ru', 'be', 'uk'].includes(lang) ? obj[param]['ru'] : obj[param]['en'])) ?? obj[param][Object.keys(obj[param])[0]]) : (isOptional ? '' : undefined)) ?? 'No ' + param + ' data is set for depot';
        }
        let interfaceTranslations = {
            'modelsList': {
                'ru': 'Список моделей',
                'be': 'Спіс мадэляў',
                'uk': 'Список моделей',
                'pl': 'Modele',
                'cs': 'seznam typů',
                'en': 'List of the models',
                'de': 'Baureihen',
                'lt': 'Modelių sąrašas',
                'lv': 'Modeļu saraksts',
                'hu': 'Típuslista'
            }
        };
        function make_depot_list(depot) {
            try {
                let elem = document.createElement('tr');
                elem.innerHTML = '<td class="c s13 help" style="font-size:17px" title="">' + (depot.active ? '•' : '×') + '</td> <td class="d" style="padding:5px 7px"><b><a href="/list.php?grid=' + depot.groupId + '">' + getTranslation(depot, 'title') + '</a></b><br><span class="sm"><br>' + getTranslation(depot, 'body', true) + '<div style=" border-bottom: 1px var(--theme-link-color) dotted; color: var(--theme-link-color); display: inline-block; padding-bottom: 3px; text-decoration: none; cursor: pointer; font-size: 10pt; " id="' + depot.name + '_list">' + getTranslation(depot, 'buttonOpen') + ' ▼</div> <br> </span></td> <td class="rs" style="padding:7px 11px 7px 7px"><a href="/show.php?grid=' + depot.groupId + '"><b>' + getTranslation(interfaceTranslations, 'modelsList') + '</b></a></td>';
                let depotObjects = [];
                Array.from(document.getElementsByClassName('sm')).forEach(el => {
                    if (el.tagName == 'A' && el.getAttribute('href') == '/list.php?grid=' + depot.groupId) {
                        depotObjects.push(el.parentNode.parentNode);
                        el.parentNode.removeChild(el.parentNode.childNodes[[...el.parentNode.childNodes].indexOf(el) - 1]);
                        el.parentNode.removeChild(el);
                    }
                });
                depotObjects[0].parentNode.insertBefore(elem, depotObjects[0]);
                depotObjects.forEach((el) => {
                    el.classList.add('hidden-depot');
                    el.children[0].style.setProperty('opacity', '.25');
                });
                function set_classes() {
                    let tr_counter = 0;
                    Array.from(depotObjects[0].parentNode.children).forEach((el) => {
                        if (!el.classList.contains('hidden-depot')) {
                            if (tr_counter % 2 == 0) {
                                el.classList.remove('s1');
                                el.children[0].classList.remove('s3');
                                el.classList.add('s11');
                                el.children[0].classList.add('s13');
                            } else {
                                el.classList.remove('s11');
                                el.children[0].classList.remove('s13');
                                el.classList.add('s1');
                                el.children[0].classList.add('s3');
                            }
                            tr_counter++;
                        }
                    });
                }
                set_classes();
                let depot_cond = 0;
                document.getElementById(depot.name + '_list').addEventListener('click', (e) => {
                    if (depot_cond) {
                        e.target.innerText = getTranslation(depot, 'buttonOpen') + ' ▼';
                        depot_cond = 0;
                        depotObjects.forEach((el) => {
                            el.classList.add('hidden-depot');
                        });
                        set_classes();
                    } else {
                        e.target.innerText = getTranslation(depot, 'buttonClose') + ' ▲';
                        depot_cond = 1;
                        depotObjects.forEach((el) => {
                            el.classList.remove('hidden-depot');
                        });
                        set_classes();
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
        depots.forEach(depot => make_depot_list(depot));
    };
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', go);
    } else go();
})();