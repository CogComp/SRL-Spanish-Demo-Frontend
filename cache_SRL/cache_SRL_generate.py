import json
import hashlib
import requests


BASE_SRL_HTTP = "http://dickens.seas.upenn.edu:4038/annotate"

#--------------------- Sample Sentences ---------------------
sample_dic ={
            "spa": [
                        "La presidenta de los Estados Unidos tiene mucho poder.",
                        "Mohandas Karamchand Gandhi fue el dirigente más destacado del Movimiento de independencia de la India contra el Raj británico, para lo que practicó la desobediencia civil no violenta, además de pacifista, político, pensador y abogado hinduista indio.",
                        "Sigmund Freud fue un neurólogo austriaco y fundador del psicoanálisis, un método clínico para tratar la psicopatología a través del diálogo entre un paciente y un psicoanalista. Freud nació de padres judíos gallegos en la ciudad morava de Freiberg, en el Imperio austríaco. Se graduó como doctor en medicina en 1881 en la Universidad de Viena. Freud vivió y trabajó en Viena, donde estableció su práctica clínica en 1886. En 1938, Freud dejó Austria para escapar de la persecución nazi.",
                        "Barack Hussein Obama II es un político y abogado estadounidense que se desempeñó como el 44º presidente de los Estados Unidos de 2009 a 2017. Miembro del Partido Demócrata, Obama fue el primer presidente afroamericano de los Estados Unidos. Anteriormente se desempeñó como senador de Estados Unidos por Illinois de 2005 a 2008 y como senador del estado de Illinois de 1997 a 2004. ",
                        "Mohandas Karamchand Gandhi fue un abogado indio, nacionalista anticolonial y especialista en ética política, que empleó la resistencia no violenta para liderar la exitosa campaña por la independencia de la India del dominio británico y, a su vez, inspiró movimientos por los derechos civiles y la libertad en todo el mundo. El Mahātmā honorífico, que se le aplicó por primera vez en 1914 en Sudáfrica, ahora se usa en todo el mundo."
                ]
        }


#-------------------- Annontation Function --------------------
def getBasicAnnotations(text):

    # SRL
    input = {"sentence":text}
    res_out_SRL = requests.post(BASE_SRL_HTTP, json = input)
    res_json_SRL = res_out_SRL.json()
    tokens = []
    endPositions = []
    if "tokens" in res_json_SRL:
        tokens = res_json_SRL["tokens"]
    # print(tokens)
    if "sentences" in res_json_SRL:
        sentences = res_json_SRL["sentences"]
        if "sentenceEndPositions" in sentences:
            endPositions = sentences["sentenceEndPositions"]
    return tokens, endPositions, res_json_SRL



if __name__ == "__main__":
    cache = {}
    for lang in sample_dic.keys():
        cache[lang] = {}

        for text in sample_dic[lang]:
            hash_value = hashlib.sha1(text.encode()).hexdigest()
            if hash_value in cache[lang].keys():
                raise ValueError('COLLISION ERROR: Different text has same hash value!')
            else:
                cache[lang][hash_value] = {}
                cache[lang][hash_value]['text'] = text
                cache[lang][hash_value]['tokens'], cache[lang][hash_value]['end_pos'], cache[lang][hash_value]['srl'] = getBasicAnnotations(text)


cache_json = json.dumps(cache, indent=4)
with open('cache_SRL/cache_SRL.json', 'w') as json_file:
    json_file.write(cache_json)


