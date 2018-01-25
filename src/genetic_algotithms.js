const TARGET = "METHINKS IT IS LIKE A WEASEL"
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const MUT_PROB = 10;
const POPULATION_SIZE = 10;


class Gemome {
	constructor(variaty){
      this.__variaty = variaty || '';	
      this.__value = this.__generateGenome();
        
	}

	__generateGenome() {
	    let result = [];
	    
	    result.push(this.__getRandomChar());
	  
	    this.__variaty.split("").forEach( ()=> {
	        result.push(this.__getRandomChar());
	    } )
	    
	    return result.join('');
	}

	__getRandomChar(max=27, min=0) {
    	return this.__variaty[Math.floor(Math.random() * (max - min) + min)]; 
	}

	doMutation(target) {
    	this.__value = this.__value.split("").map( 
	        (e, i)=>{
	            return (e === target[i]) ? e : this.__getRandomChar();    
	    	}).join("");
	}

	getFitness(target) {
	    return target.split("").map( (e,i)=>{
	        return e ===  this.__value[i];
	    } ).filter( e => e).length
	}

	get value() {
		return this.__value;
	}
}

class Pool{
	constructor(genome, population_size = 10) {
      this.__population_size = population_size;
      this.__items = this.__genePool(genome) || []; 
	}

	__genePool(genome){
	    let pool = [];
	    let genaration = this.__population_size;
	    while (genaration > 0){
	        pool.push(genome);
	        --genaration;
	    }
	    return pool;
	}

	getFittest(target) {
	    let fittest;
	    let max_value = -1;
	    this.__items.forEach( (genome) => {
	        let fitness = genome.getFitness(target);
	        fittest = ( fitness > max_value ) ? genome : fittest; 
	    });
    	
    	return fittest;
	}

	get items() {
		return this.__items;
	}
  
    set items(i) {
      this.__items = i;
    }
}

class Evolve{
	
	constructor(target, variaty, population_size){
		this.__target = target;
		this.__variaty = variaty;
		this.__population_size  = population_size;

		this.__ds = {target, variaty, population_size};
	}

	run(){
		let numGens = 0;
	   	let genome = new Gemome(this.__variaty);
	   
	   while( genome.getFitness(this.__target)!== this.__target.length ) {
           let pool = new Pool(genome, this.__population_size);
             
         
	        pool.items.forEach( (g) => {
	            g.doMutation(this.__target);
	        })
                  
	        genome = pool.getFittest(this.__target);
	     
            console.log(`${numGens}: ${genome.value}`);
	        ++numGens;
	   }
	   
	   return genome
	} 	
}

const evolve = new Evolve(TARGET, ALPHABET, POPULATION_SIZE);
console.log(evolve.run().value);
