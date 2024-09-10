import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BoardArticle } from './board-article.entity';
import { BoardConfig } from './board-config.entity';

@Entity('board_article_comment')
export class BoardArticleComment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => BoardConfig)
	@JoinColumn({ name: 'config_id' })
	config: BoardConfig;

	@ManyToOne(() => BoardArticle)
	@JoinColumn({ name: 'article_no' })
	article: BoardArticle;

	@Column({ type: 'int' })
	commentNo: number;

	@Column({ type: 'text' })
	content: string;

	@Column({ type: 'varchar', length: 15, nullable: true })
	regIp: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	regUserNo: string;

	@CreateDateColumn({ type: 'timestamptz' })
	regDate: Date;
}