import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    userAddress: string;

    @Column({nullable: true})
    nonce: number;

}