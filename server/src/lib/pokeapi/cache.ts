import NodeCache from "node-cache";

const pokemons = new NodeCache();
const abilities = new NodeCache();
const berries = new NodeCache();

const Cache = {
  pokemons,
  abilities,
  berries,
};

setInterval(() => {
  let stats = pokemons.getStats();
  console.log(
    `⚡️[server]: pokemon cache -> 
        keys: ${stats.keys}, 
        hits: ${stats.hits}, 
        misses: ${stats.misses}, 
        ksize: ${stats.ksize / 1000}(kB), 
        vsize: ${stats.vsize / 1000} (kB)`
  );
  /*
  stats = abilities.getStats();
  console.log(
    `⚡️[server]: abilities cache -> 
        keys: ${stats.keys}, 
        hits: ${stats.hits}, 
        misses: ${stats.misses}, 
        ksize: ${stats.ksize / 1000}(kB), 
        vsize: ${stats.vsize / 1000} (kB)`
  );
  stats = berries.getStats();
  console.log(
    `⚡️[server]: berries cache -> 
        keys: ${stats.keys}, 
        hits: ${stats.hits}, 
        misses: ${stats.misses}, 
        ksize: ${stats.ksize / 1000}(kB), 
        vsize: ${stats.vsize / 1000} (kB)`
  );
  */
}, 5 * 1000);

export = Cache;
