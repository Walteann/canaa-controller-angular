import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { GasModel } from './gas.model';

@Injectable()
export class GasService {

    gasLista: AngularFireList<any>;
    gasSelecionado: GasModel = new GasModel();

    constructor(
        private firebase: AngularFireDatabase
    ) { }

    getUsuarios() {
        return this.firebase.list('usuarios');
    }

    getData() {
        this.gasLista = this.firebase.list('novosPedidos', ref => ref.orderByChild('hora'));
        return this.gasLista;
    }

    // adicionarGas(gas: GasModel) {
    //     this.gasLista.push({
    //         marca: gas.marca,
    //         novoRetornavel: gas.novoRetornavel,
    //         uidUsuario: this.usuarioUid,
    //         quantidade: gas.quantidade,
    //         formaPagamento: gas.formaPagamento,
    //         troco: gas.troco,
    //         valorTroco: gas.valorTroco,
    //         valorUnitario: gas.valorUnitario,
    //         total: gas.total,
    //         dataPedido: gas.dataPedido,
    //         tipoObjeto: gas.tipoObjeto,
    //         hora: gas.hora
    //     });
    // }

    updateEmployee(gas: GasModel) {
        this.gasLista.update(gas.$key, {
            marca: gas.marca,
            novoRetornavel: gas.novoRetornavel,
            uidUsuario: gas.uidUsuario,
            quantidade: gas.quantidade,
            formaPagamento: gas.formaPagamento,
            troco: gas.troco,
            valorTroco: gas.valorTroco,
            valorUnitario: gas.valorUnitario,
            total: gas.total,
            dataPedido: gas.dataPedido,
            tipoObjeto: gas.tipoObjeto,
            hora: gas.hora
        });
    }

    deleteEmployee($key: string) {
        this.gasLista.remove($key);
    }
}
