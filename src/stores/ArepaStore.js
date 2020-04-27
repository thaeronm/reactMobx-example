import { decorate, observable, action, computed, reaction } from 'mobx';
import ArepaService from '../services/ArepaService'

class ArepaStore {
    constructor () {
        this.arepaService = new ArepaService();
        this.arepas = [];
        const localArepas = localStorage.getItem("arepas");
        if (localArepas) {
            this.arepas = JSON.parse(localArepas);
        } else {
            this.getArepas();
        }
    }

    getArepas = async () => { 
        const arepas = await this.arepaService.get();
        this.arepas = arepas;
    }
    
    agregarArepa = async (arepa) => {
        const newArepa = await this.arepaService.post(arepa);
        this.arepas.push(newArepa);
    };

    eliminarArepa = async (id) => {
        await this.arepaService.delete(id);
        this.arepas = this.arepas.filter(arepa => {
            return arepa._id !== id;
        });
    };

    get numeroArepas () {
        return this.arepas.length;
    }
};

decorate(ArepaStore, {
    arepas: observable,
    getArepas: action,
    agregarArepa: action,
    eliminarArepa: action,
    numeroArepas: computed
});

const arepaStore = new ArepaStore();

reaction(
    () => JSON.stringify(arepaStore.arepas),
    arepaStr => {
        localStorage.setItem("arepas", arepaStr);
    }
);

export default arepaStore;