import { CommentPost } from 'src/post/entities/comment-post.entity';
import { Post } from 'src/post/entities/post.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
/* import { Product } from '../../products/entities'; */


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];


    @ManyToMany(() => Professor, (professor) => professor.usersRated)
    @JoinTable()
    professorsRated: Professor[];


    //blog Post 
    @OneToMany(() => Post, post => post.author)
    posts: Post[];


    @OneToMany(() => CommentPost, commentPost => commentPost.author)
    comments: CommentPost[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }




    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
