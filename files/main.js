var item = document.querySelectorAll('.s-year');

const DATA = `
1|Chatbot2007|Natural Language Processing,Human-AI Interaction
2|RecEvidence2016|Search and Recommendation
3|EntityRelation2017|Search and Recommendation
4|LTR4EntityRec2018|Search and Recommendation
5|EHGeneration2018|Search and Recommendation
6|MT4EntityRec2018|Search and Recommendation
7|RWM2019|Computer Vision
8|PhDThesis2019|Search and Recommendation
9|EntityRecSurvey2019|Search and Recommendation
10|MONOPOLY2019|Data Mining
11|CurbsideParking2019|Intelligent Transportation
12|EconomicCOVID2020|Data Mining
13|ResponsesCOVID2020|Data Mining
14|PAC2020|Search and Recommendation
15|MultiTask4ER-DR2020|Search and Recommendation
16|ConSTGAT2020|Intelligent Transportation
17|PPAC2020|Search and Recommendation
18|TransportationCOVID2020|Data Mining
19|HotelRec2020|Search and Recommendation
20|MeasuresCOVID2020|Data Mining
21|CWatcher2021|Data Mining
22|ActivitiesCOVID2021|Data Mining
23|DialogGen2021|Natural Language Processing,Human-AI Interaction
24|NextPOIRec2021|Search and Recommendation
25|MLPAC2021|Search and Recommendation
26|SSML2021|Intelligent Transportation
27|HGAMN2021|Search and Recommendation
28|PublicResponsesCOVID2021|Data Mining
29|DOLG2021|Computer Vision
30|GEDIT2021|Natural Language Processing
31|FederatedLearningsurvey2022|Artificial Intelligence
32|DuARE2022|Intelligent Transportation
33|DuIVA2022|Natural Language Processing,Human-AI Interaction
34|ERNIE-GeoL2022|Natural Language Processing
35|DuTraffic2022|Intelligent Transportation
36|DuARUS2022|Intelligent Transportation
37|DuMapper2022|Intelligent Transportation
38|DuETA2022|Intelligent Transportation
39|DuIVRS2022|Natural Language Processing,Human-AI Interaction
40|AirPollution2023|Data Mining
41|UrbanRegionGraph2023|Data Mining
42|3DPointCloudGen2023|Computer Vision
43|TSC2023|Search and Recommendation
44|POInBlog2023|Search and Recommendation
45|SHAGNN2023|Data Mining
`;

// 决定tag标签整体排序
const tagsOrder = [
  'Human-AI Interaction',
  'Intelligent Transportation',
  'Data Mining',
  'Natural Language Processing',
  'Search and Recommendation',
  'Computer Vision',
  'Artificial Intelligence'
];

// 决定tag内文章排序，如果缺省的文章，倒排在这些之后
const paperOrderInTag = {
  'Human-AI Interaction': [33, 39, 1, 23],
  'Intelligent Transportation': [38, 26, 16, 35, 32, 36, 37],
  'Data Mining': [40, 18, 41, 45, 21],
  'Natural Language Processing': [34, 33, 39, 1, 23, 30],
  'Search and Recommendation': [27, 25, 17, 14, 24, 43, 44, 19, 15, 6, 4, 5, 3, 2, 8, 9],
  'Computer Vision': [7, 29, 32],
  'Artificial Intelligence': [7]
}


function processData(data) {
  const tagPaper = {};
  const arr = data.split(/\n/).filter(line => line.length > 1).map(line => {
    const rs = line.split('|');
    rs[2] = rs[2].split(',').map(tag => tag.replace(/^\s/, '').replace(/\s$/), '');
    rs[2].forEach((tag, index) => {
      tag = tag || 'Others';
      tagPaper[tag] = tagPaper[tag] || [];
      tagPaper[tag].push(document.querySelector('#paper-'+parseInt(rs[0])));
    });
    return rs;
  });
  Object.keys(tagPaper).forEach(tag => {
    const oldList = tagPaper[tag];
    tagPaper[tag] = [];
    const preorder = paperOrderInTag[tag] || [];
    preorder.forEach(idx => {
      oldList.forEach((dom, index) => {
        if (dom && dom.id == 'paper-'+idx) {
          tagPaper[tag].push(dom);
          oldList[index] = null;
        }
      });
    });
    oldList.reverse().filter(dom => dom !== null).forEach(dom => {tagPaper[tag].push(dom)});
  });
  return { items: arr, tagPaper };
}


function init() {
  initYears();
  initViewBy();
}

const cache = document.querySelectorAll(".paper-list>*");

function initViewBy() {
  let type = 'year';
  const tagDom = document.querySelector('#filter-tag');
  const yearDom = document.querySelector('#filter-year');
  const { tagPaper } = processData(DATA);
  tagDom.addEventListener('click', () => {
    if (type === 'tag') return;
    yearDom.classList.remove('active');
    tagDom.classList.add('active');
    type = 'tag';
    processTag(tagPaper);
  });
  yearDom.addEventListener('click', () => {
    if (type === 'year') return;
    tagDom.classList.remove('active');
    yearDom.classList.add('active');
    type = 'year';
    processYear();
  });
}
function processTag(tagPaper) {
  const parent = document.querySelector(".paper-list");
  Array.from(document.querySelectorAll(".paper-list>*")).forEach(dom => dom.remove());
  cache.forEach(dom => {
    dom.remove();
  });
  tagsOrder.forEach((tag, index) => {
    const li = document.createElement('li');
    li.classList.add('s-tag');
    li.innerHTML = tag;
    parent.append(li);
    const doms = [];
    tagPaper[tag].forEach(dom => {
      const newDom = dom.cloneNode(true);
      parent.append(newDom);
      doms.push(newDom);
    });
    li.addEventListener('click', function() {
      if(li.classList.contains('s-tag-close')) {
        li.classList.remove('s-tag-close');
        doms.forEach(dom => {dom.style.display = 'block';});
      } else {
        li.classList.add('s-tag-close');
        doms.forEach(dom => {dom.style.display = 'none';});
      }
    });
  });
}

function processYear() {
  Array.from(document.querySelectorAll(".paper-list>*")).forEach(dom => dom.remove());
  cache.forEach(dom => {
    document.querySelector(".paper-list").append(dom);
  });
}


function initYears() {
  for(var i = 0; i < item.length; i++) {
    var btn = item[i];
    
    btn.addEventListener('click', function(e) {
      var s = e.target || e.srcElement;
      var year= s.getAttribute('year');
      var state = s.getAttribute('ystate');
      if (state != '1') {
        s.setAttribute('ystate', 1);
        s.className = 's-year s-year-close';
        var list = document.querySelectorAll('.li-' + year);
        for(var j = 0; j < list.length; j++) {
          list[j].style.display = 'none';
        }
      } else {
        s.setAttribute('ystate', 0);
        s.className = 's-year';
        var list = document.querySelectorAll('.li-' + year);
        for(var j = 0; j < list.length; j++) {
          list[j].style.display = 'block';
        }
      }
    });
  }
}

init();