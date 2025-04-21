#include <stdio.h>
#include <stdlib.h>
#include "queue.h"

// Hàm enqueue để thêm một pcb_t vào hàng đợi
void enqueue(struct queue_t * q, struct pcb_t * proc){
	if (q->size < MAX_QUEUE_SIZE) {
        q->proc[q->size] = proc;
        q->size++;
    } else {
        printf("Queue is full. Cannot enqueue.\n");
		return NULL;
    }
}
// Hàm dequeue để lấy một pcb_t ra khỏi hàng đợi
struct pcb_t * dequeue(struct queue_t * q){
	if (q->size > 0) {
		struct pcb_t * proc = q->proc[0];
		for (int i = 1; i < q->size; i++) {
			q->proc[i - 1] = q->proc[i];
		}
		q->size--;
		return proc;
	} else {
		printf("Queue is empty. Cannot dequeue.\n");
		return NULL;
	}
}

int empty(struct queue_t * q){
	if (q->size == 0) return 1;
	return (q->size == 0);
}


