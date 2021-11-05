# Описание методики создания сворачиваемых списков для депо на `fotobus.msk.ru`
1. Предварительно под каждое объединяющее предприятие с разворачиваемым списком необходимо создать свою группу и добавить в неё все депо, которые в дальнейшем будут скрываться и разворачиваться по нажатию на кнопку.
   Например, в Дубае существует единый городской перевозчик RTA, у которого имеется ряд депо. Необходимо создать группу, например, "RTA" и привязывать все депо к этой группе.

2. Все депо необходимо собрать в одной локации и расположить одно за другим в списке.

3. Взяв за основу код из файла `depotList.js`, в  переменную `depots` вносятся данные будущих объединяющих предприятий в формате JSON со следующей структурой:
```
{
    "name": string, - уникальное имя списка депо,
    "groupId": number, - идентификатор группы депо (в URL страницы депо - параметр grid, например, https://fotobus.msk.ru/list.php?grid=333 - идентификатор группы равен 333),
    "active": boolean, - параметр функционирования предприятия (true - если предприятие функционирует, false - если закрыто)
    "title": { "language key": string, ... }, - название предприятия на различных языках (каждый язык задаётся параметром вида "код языка": "Название предприятия")
    "body": { "language key": string, ... }, (ОПЦИОНАЛЬНЫЙ ПАРАМЕТР) - примечание предприятия, возможна разметка HTML
    "buttonOpen": { "language key": string, ... }, - текст для кнопки разворачивания списка
    "buttonClose": { "language key": string, ... } - текст для кнопки сворачивания списка
}
```

Пример:
```JSON
{
    "name": "rta",
    "groupId": "333",
    "active": true,
    "title": { "ru": "Roads and Transport Authority", "en": "Roads and Transport Authority" },
    "body": { "ru": "Roads and Transport Authority является единственным городским перевозчиком в городе Дубай. Обслуживает так же пригородные и междугородние маршруты. Компания имеет 6 автобусных депо и более 2000 автобусов", "en": "Roads and Transport Authority is the only urban carrier in Dubai. It serves also suburban and intercity routes. The company has 6 bus depots and more than 2000 buses" },
    "buttonOpen": { "ru": "Развернуть список депо", "en": "Unroll depot list" },
    "buttonClose": { "ru": "Cвернуть список депо", "en": "Roll up depot list" }
}
```

4. На странице редактирования региона в поле "Информация" необходимо добавить HTML-код вида:
```HTML
<script>
    // код из depotList.js с внесёнными данными предприятий
</script>
```

# Description of the methodology for creating collapsible lists for depots on `fotobus.msk.ru`
1. Firstly it is necessary to create group for each unifying company with collapsible list and put each depot of unifying company in it.
   For example, Dubai has one urban carrier RTA with a number on depots. We should create a group, ex., "RTA" and link each depot to this group

2. All depot should be collected in one location and should be placed one after the other.

3. After taking as a basis code from `depotList.js` file data of future unifying companies should be added in `depots` variable in JSON format with the following structure:
```
{
    "name": string, - unique depot list name,
    "groupId": number, - depot group index (you can find it in the URL of group page, grid parameter, ex., https://fotobus.msk.ru/list.php?grid=333 - group index is 333),
    "active": boolean, - company working status (true - for working company, false - for closed)
    "title": { "language key": string, ... }, - company name on different languages (each language is set by parameter like "language code": "Company name")
    "body": { "language key": string, ... }, (OPTIONAL PARAMETER) - company Note, HTML available
    "buttonOpen": { "language key": string, ... }, - text for list unrolling button
    "buttonClose": { "language key": string, ... } - text for list rolling up button
}
```

Example:
```JSON
{
    "name": "rta",
    "groupId": "333",
    "active": true,
    "title": { "ru": "Roads and Transport Authority", "en": "Roads and Transport Authority" },
    "body": { "ru": "Roads and Transport Authority является единственным городским перевозчиком в городе Дубай. Обслуживает так же пригородные и междугородние маршруты. Компания имеет 6 автобусных депо и более 2000 автобусов", "en": "Roads and Transport Authority is the only urban carrier in Dubai. It serves also suburban and intercity routes. The company has 6 bus depots and more than 2000 buses" },
    "buttonOpen": { "ru": "Развернуть список депо", "en": "Unroll depot list" },
    "buttonClose": { "ru": "Cвернуть список депо", "en": "Roll up depot list" }
}
```

4. On the region editing page following HTML-code should be added in the "Information" field:
```HTML
<script>
    // code from depotList.js with unifying companies data
</script>
```