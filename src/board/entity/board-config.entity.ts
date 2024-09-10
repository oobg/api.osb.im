import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('board_config')
export class BoardConfig {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	siteNo: string;

	@Column({ type: 'varchar', length: 20 })
	compNo: string;

	@Column({ type: 'varchar', length: 20 })
	boardId: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	boardTypeKind: string;

	@Column({ type: 'text', nullable: true })
	boardNote: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	regUserNo: string;

	@CreateDateColumn({ type: 'timestamptz' })
	regDate: Date;

	@Column({ type: 'varchar', length: 20, nullable: true })
	modUserNo: string;

	@UpdateDateColumn({ type: 'timestamptz' })
	modDate: Date;
}