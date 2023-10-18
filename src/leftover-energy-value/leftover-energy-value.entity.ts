import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class LeftoverEnergyValue {

    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    userAdress: string;

    @Column()
    date: Date;

    @Column()
    energyValue: number;

}