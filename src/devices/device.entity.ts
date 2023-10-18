import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";


@Entity()
export class Device {

    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    deviceType: string;

    @Column()
    issuerAddress: string;

    @Column()
    name: string;

}