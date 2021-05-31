function randomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner:null,
      logMessages:[]
    };
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue=randomValue(7,12);
      this.monsterHealth -= attackValue;
      this.addLog('Player','Attack',attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randomValue(8,15);
      this.playerHealth -= attackValue;
      this.addLog('Monster','Attack',attackValue);
    },
    specialAttackMonster() {
      const attackValue = randomValue(10,25);
      this.monsterHealth -= attackValue;
      this.addLog('Player','Special Attack',attackValue);
    //   this.currentRound+=1;
    },
    healPlayer(){
        this.currentRound++;
        const healValue=randomValue(8,20);
        if(this.playerHealth>100){
            this.playerHealth=100;
            
        }
        else{
        this.playerHealth+=healValue;
    }
    this.addLog('Player','Heal', healValue);
    this.attackPlayer();
    },
    startGame(){
        this.playerHealth=100;
        this.monsterHealth=100;
        this.winner=null;
        this.currentRound=0;
        this.logMessages=[];
    },
    surrender(){
        this.winner = 'Monster';
    },
    addLog(who, what, value ){
        this.logMessages.unshift({
            actionBy: who,
            actionType:what,
            actionValue:value
        })
    }
    
  },
  computed: {
    monsterBarStyles() {
        if(this.monsterHealth<0){
            return {width:'0%'};
        }
      return {
        width: this.monsterHealth + "%",
      };
    },
    playerBarStyles() {
        if(this.playerHealth<0){
            return {width:'0%'};
        }
      return {
        width: this.playerHealth + "%",
      };
    },
    specialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch:{
      playerHealth(value){
          if(value<=0 && this.monsterHealth<=0){
              this.winner = 'Draw';
          }
          else if(value<=0){
              this.winner = 'Monster'
          }

      },
      monsterHealth(value){
        if(value<=0 && this.playerHealth<=0){
            this.winner = 'Draw';
        }
        else if(value<=0){
            this.winner = 'Player'
        }
      }
  }
});
app.mount("#game");
