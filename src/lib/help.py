import httpx
from bs4 import BeautifulSoup

words = set()

res = httpx.get(
    'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Hungarian_frequency_list_1-10000')
data = res.text

soup = BeautifulSoup(data, 'html.parser')

ol = soup.find('ol')

a_tags = ol.find_all('a')
for a in a_tags:
    words.add(a.string)

keys = [
    "f",
    "j",
    "d",
    "k",
    "s",
    "l",
    "a",
    "é",
    "g",
    "h",
    "u",
    "r",
    "i",
    "e",
    "o",
    "w",
    "p",
    "q",
    "z",
    "t",
    "á",
    "ű",
    "n",
    "v",
    "b",
    "c",
    "m",
    "x",
    "y",
    "í",
    "ő",
    "ú",
    "ö",
    "ü",
    "ó"
]


with open('words.json', mode='w', encoding='utf-8') as json:
    
    json.write('[\n')
    json.write(',\n'.join('"' + x + '"' for x in words))
    json.write('\n]')


# word_dict = {}

# for i in range(len(keys)):
#     key = keys[i]
#     chars = keys[:i+1]
#     key_set = set()
#     for word in words:
#         if key not in word:
#             continue
#         append = True
#         for char in word:
#             if char not in chars:
#                 append = False
#                 break
            
#         if append: key_set.add(word)
        
#     word_dict[key] = sorted(list(key_set), key=lambda x: x.count(key), reverse=True)
    
    
# with open('words.json', mode='w', encoding='utf-8') as json:
    
#     for key in keys:
#         json.write(f'"{key}": [\n')
        
#         json.write(',\n'.join('"' + x + '"' for x in word_dict[key]))
        
#         json.write('],\n')
    
