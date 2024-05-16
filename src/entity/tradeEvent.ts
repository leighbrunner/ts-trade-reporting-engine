import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TradeEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    buyer_party: string;

    @Column({ type: 'varchar' })
    seller_party: string;

    @Column({ type: 'numeric' })
    premium_amount: number;

    @Column({ type: 'varchar' })
    premium_currency: string;
}
