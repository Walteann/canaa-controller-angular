import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { GasModel } from './shared/gas.model';
import { Endereco } from './shared/endereco.model';
import { GasService } from './shared/gas.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'app';
    usuarios: any = [] ;
    ctx: any;
    ctxBarChart: any;
    myLineChart: any;
    myLineChart2: any;
    detalhePedido: any = {};
    usuarioPedido: any = {};

    tamanhoAntigo = 0;
    novosPedidos = 0;

    gasList: GasModel[];
    xis: any;
    ypson: any;

    constructor(
        private _gasService: GasService,
        private toast: ToastrService,
        private db: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth
    ) {

    }

    ngOnInit() {
        this.buscarEmployee();
        // this.buscarUsuarios();
    }

    ngAfterViewInit() {
        this.graficoVendasDiarias();
        this.graficoVendasMensais();

    }

    // buscarUsuarios() {
    //     let keyEndereco;
    //     let valores;
    //     this.getAllUsuarios().snapshotChanges()
    //     .map(changes => {
    //         return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    //     }).subscribe(data => {
    //         // this.usuarios = data;
    //         // console.log(data[0].enderecos['-LDHQrnAGjHglVAt1rKT']);
    //         data.forEach((element) =>   {
    //             keyEndereco = Object.keys(element.enderecos);
    //             valores = element.enderecos[keyEndereco];
    //             this.usuarios.push(valores as Endereco);
    //         });
    //         console.log(this.usuarios);
    //     });
    // }

    getAllUsuarios() {
        return this.db.list('usuarios');
    }

    getUserId(key: string) {
        return this.db.object('usuarios/' + key).snapshotChanges()
          .map(c => {
            return { key: c.key, ...c.payload.val() };
          });
    }

    buscarEmployee() {
        this.xis = this._gasService.getData();
        this.xis.snapshotChanges().subscribe(item => {
            this.gasList = [];
            item.forEach(element => {
                this.ypson = element.payload.toJSON();
                this.ypson['$key'] = element.key;
                this.gasList.push(this.ypson as GasModel);
            });


            if (this.tamanhoAntigo + 1 === this.gasList.length) {
                this.novosPedidos = this.gasList.length - this.tamanhoAntigo;
                this.tamanhoAntigo = this.gasList.length;
                this.toast.success('Novo Pedido', 'Novo Pedido foi adicionado');
            } else if (this.tamanhoAntigo < this.gasList.length) {
                this.tamanhoAntigo = this.gasList.length;
            } else if (this.gasList.length > this.tamanhoAntigo) {
                this.novosPedidos = this.gasList.length - this.tamanhoAntigo;
                this.tamanhoAntigo = this.gasList.length;
            } else {
                this.tamanhoAntigo = this.gasList.length;

            }
        });
        // if (this.xis.length() === this.tamanhoAntigo) {

        // } else if (this.tamanhoAntigo > this.xis.length) {
        //     this.tamanhoAntigo = this.xis.length;
        //     this.toast.success('Novo Pedido', 'Novo Pedido foi adicionado');
        // }
    }

    onDelete(key: string) {
        if (confirm('Você tem ceteza que quer deletar??') === true) {
            this._gasService.deleteEmployee(key);
            this.toast.warning('Deletado Com Sucesso!!', 'Pedido foi Deletado');
        }
    }

    detalhes(gas: any) {
        this.detalhePedido = gas;
        let teste;
        this.getUserId(gas.uidUsuario).subscribe(data =>   {
            teste = Object.keys(data.enderecos);
            this.usuarioPedido = data.enderecos[teste];
        });
    }



    graficoVendasDiarias() {
        this.ctx = document.getElementById('myAreaChart');
        this.myLineChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['Abril 1', 'Abril 2', 'Abril 3', 'Abril 4', 'Abril 5', 'Abril 6', 'Abril 7',
                    'Abril 8', 'Abril 9', 'Abril 10', 'Abril 11', 'Abril 12', 'Abril 13'],
                datasets: [{
                    label: 'Quantidade',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(2,117,216,0.2)',
                    borderColor: 'rgba(2,117,216,1)',
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(2,117,216,1)',
                    pointBorderColor: 'rgba(255,255,255,0.8)',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                    pointHitRadius: 20,
                    pointBorderWidth: 2,
                    data: [2, 6, 2, 15, 7, 1, 4, 20, 17, 10, 11, 6, 8],
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 30,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, .125)',
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        });
    }

    graficoVendasMensais() {
        this.ctxBarChart = document.getElementById('myBarChart');
        this.myLineChart2 = new Chart(this.ctxBarChart, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho'],
                datasets: [{
                    label: 'Revenue',
                    backgroundColor: 'rgba(2,117,216,1)',
                    borderColor: 'rgba(2,117,216,1)',
                    data: [200, 312, 251, 161, 223, 265],
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'month'
                        },
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 6
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 400,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        });
    }

}


