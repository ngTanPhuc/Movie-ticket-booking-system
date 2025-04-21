
#ifndef QUEUE_H
#define QUEUE_H

#include "common.h"

#define MAX_QUEUE_SIZE 10

struct queue_t {
	struct pcb_t * proc[MAX_QUEUE_SIZE];
	int size;
};
// Hàm enqueue để thêm một pcb_t vào hàng đợi
void enqueue(struct queue_t * q, struct pcb_t * proc);
// Hàm dequeue để lấy một pcb_t ra khỏi hàng đợi
struct pcb_t * dequeue(struct queue_t * q);
// Hàm empty để kiểm tra xem hàng đợi có rỗng hay không
int empty(struct queue_t * q);

#endif

