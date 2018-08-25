import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { GasModel } from './shared/gas.model';
import { Endereco } from './shared/endereco.model';
import { GasService } from './shared/gas.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'app';
    usuarios: Endereco[];
    item: Observable<any>;
    usuariosTwo: Observable<any[]>;
    ctx: any;
    ctxBarChart: any;
    myLineChart: any;
    myLineChart2: any;
    detalhePedido: any = {};
    usuarioPedido: any = {};
    usuarioList: any = {};

    tamanhoAntigo = 0;
    novosPedidos = 0;

    quantidadeUsuaarios = 0;

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
        // this.listaTodosUsuarios();
        // let teste

        // this.getAllUsuarios().snapshotChanges().map(changes => {
        //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        // }).subscribe(data =>    {
        //     data.forEach((element) =>   {
        //         this.usuarios = [];
        //         this.getUserId(element.uid).subscribe((dados) =>    {
        //             if (dados.enderecos !== undefined) {
        //                 teste = Object.keys(dados.enderecos);
        //                 this.usuarios.push(dados.enderecos[teste]);
        //                 console.log(this.usuarios);
        //                 this.quantidadeUsuaarios = this.usuarios.length;
        //             }
        //         });
        //     });
        // });
        /*esse funciona \/ */
        // this.getAllUsuarios().valueChanges().subscribe(data =>  {
        //     let teste;
        //     console.log(data);
        //     data.forEach((element) =>   {
        //         this.usuarios = [];
        //         this.getUserId(element['uid']).subscribe((dados) =>    {
        //             console.log(element);
        //             if (dados['enderecos'] !== undefined) {
        //                         teste = Object.keys(dados['enderecos']);
        //                         this.usuarios.push(dados['enderecos'][teste]);
        //                         console.log(this.usuarios);
        //                         this.quantidadeUsuaarios = this.usuarios.length;
        //                     }
        //                 });
        //             });
        // });
        // FUNCIONA
        this.getAllUsuarios().subscribe(data =>  {
            let teste;
            console.log(data);
            data.forEach((element) =>   {
                this.usuarios = [];
                this.getUserId(element['uid']).subscribe((dados) =>    {
                    console.log(element);
                    if (dados['enderecos'] !== undefined) {
                                teste = Object.keys(dados['enderecos']);
                                this.usuarios.push(dados['enderecos'][teste]);
                                console.log(this.usuarios);
                                this.quantidadeUsuaarios = this.usuarios.length;
                            }
                        });
                    });
        });


        // console.log(this.getAllUsuarios());

        // this.getUserList().subscribe(data => {
        //     this.usuarios = [];
        //         data.forEach((element) =>   {
        //         if (element !== undefined) {
        //             teste = Object.keys(element['enderecos']);
        //             console.log(teste[0]);
        //             this.

        //         }
        //     });
        // });
        // .snapshotChanges().map(changes => {
        //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        // }).subscribe(data =>    {
        //     data.forEach((element) =>   {
        //         this.usuarios = [];
        //         this.getUserId(element.uid).subscribe((dados) =>    {
        //             if (dados.enderecos !== undefined) {
        //                 teste = Object.keys(dados.enderecos);
        //                 this.usuarios.push(dados.enderecos[teste]);
        //                 console.log(this.usuarios);
        //                 this.quantidadeUsuaarios = this.usuarios.length;
        //             }
        //         });
        //     });
        // });

        // this.usuariosTwo = this.teste();
        // console.log(this.usuariosTwo);
    }

    ngAfterViewInit() {
        this.graficoVendasDiarias();
        this.graficoVendasMensais();

    }

    // teste(): any {
    //     this.getAllUsuarios().subscribe(data =>  {
    //         let teste;
    //         let uidNovo;
    //         console.log(data);
    //         data.forEach((element) =>   {
    //             this.usuarios = [];
    //             this.getUserId(element['uid']).subscribe((dados) =>    {
    //                 console.log(this.usuarios);
    //                 console.log(element);
    //                 uidNovo = Object.keys(dados['enderecos']);


    //                     if (dados['enderecos'] !== undefined || dados['enderecos'] !== null) {
    //                                 teste = Object.keys(dados['enderecos']);
    //                                 this.usuarios.push(dados['enderecos'][teste]);
    //                                 this.quantidadeUsuaarios = this.usuarios.length;
    //                                 console.log(this.usuarios);
    //                                 return this.usuarios;
    //                             }
    //                         });
    //                     });

    //         });
    // }
    // buscarUsuarios() {
    //     let keyEndereco;
    //     let valores;
    //     this.getAllUsuarios().snapshotChanges()
    //     .map(changes => {
    //         return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    //     }).subscribe(data => {
    //         this.usuarios = data;
    //         // console.log(data[0].enderecos['-LDHQrnAGjHglVAt1rKT']);
    //         data.forEach((element) =>   {
    //             keyEndereco = Object.keys(element.enderecos);
    //             console.log(keyEndereco);

    //             valores = element.enderecos[keyEndereco];
    //             this.usuarios.push(valores as Endereco);
    //         });
    //         console.log(this.usuarios);
    //         this.quantidadeUsuaarios = data.length;
    //     });
    // }

    // listaTodosUsuarios() {
    //     // let teste;

    //     this.getAllUsuarios().snapshotChanges().map(changes => {
    //         return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    //     }).subscribe(teste =>    {

    //         this.getUserList().subscribe((data) => {
    //             this.usuarios = [];
    //             data.forEach((element) =>   {
    //                 if (element !== undefined) {
    //                     teste = Object.keys(element['enderecos']);
    //                     console.log(teste[0]);
    //                     teste.forEach((item) =>  {
    //                         this.getUserId(item).subscribe(t => {
    //                             console.log(t);
    //                         });
    //                         // this.getTeste(item.keys)
    //                         console.log(item);
    //                     });

    //                 }
    //             });
    //         });
    //     });
    // }

    getAllUsuarios() {
        return this.db.list('listaUsuarios').snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
          );
    }

    getUserId(key: string) {
        return this.db.object('usuarios/' + key).valueChanges();
    }

    getUserId2(key: string) {
        return this.db.object('usuarios/' + key).snapshotChanges();
    }

    getTeste(key: string, keyEnd: string) {
        return this.db.object('usuarios/' + key + '/enderecos' + keyEnd).valueChanges();
    }
    getUserList() {
        return this.db.list('usuarios').valueChanges();
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
        this.getUserId(gas.uidUsuario).subscribe(data => {
            console.log(data);
            teste = Object.keys(data['enderecos']);
            this.usuarioPedido = data['enderecos'][teste];
        });
    }

    detalhesUsuario(usuario: any) {
        this.usuarioList = usuario;
        console.log(usuario);
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


