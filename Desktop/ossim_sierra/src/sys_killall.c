#include "include/common.h"
#include "include/syscall.h"
#include "stdio.h"
#include "include/libmem.h"
#include "include/queue.h"

int __sys_killall(struct pcb_t *caller, struct sc_regs* regs)
{
    char proc_name[100] = {0};  // Mảng lưu tên tiến trình, khởi tạo bằng 0
    uint32_t data;

    // Lấy tên tiến trình từ bộ nhớ (vùng nhớ được chỉ định bởi memrg)
    uint32_t memrg = regs->a1;

    int i = 0;
    while (i < sizeof(proc_name) - 1) {
        if (libread(caller, memrg, i, &data) != 0) {
            printf("Error: Failed to read memory at index %d from region %d\n", i, memrg);
            return -1;
        }
        if (data == (uint32_t)-1) {
            proc_name[i] = '\0';
            break;
        }
        proc_name[i] = (char)data;
        i++;
    }
    if (i == sizeof(proc_name) - 1) {
        printf("Warning: Process name may be truncated as it exceeds buffer size.\n");
        proc_name[i] = '\0';
    }

    printf("The procname retrieved from memregionid %d is \"%s\"\n", memrg, proc_name);

    // Kiểm tra danh sách tiến trình đang chạy
    struct queue_t *running_list = caller->running_list;
    if (running_list == NULL) {
        printf("Error: Running list is NULL.\n");
        return -1;
    }

    struct queue_t temp_queue = *running_list; // Tạo bản sao để duyệt mà không làm thay đổi hàng đợi gốc
    while (!empty(&temp_queue)) {
        struct pcb_t *current_proc = dequeue(&temp_queue);
        if (current_proc == NULL) {
            printf("Error: Dequeued process is NULL.\n");
            continue;
        }
        if (strcmp(current_proc->path, proc_name) == 0) {
            printf("Terminating process with PID: %d, Path: %s\n", current_proc->pid, current_proc->path);

            // Giải phóng tài nguyên của tiến trình
            if (libfree(current_proc, 0) != 0) { // Sử dụng reg_index mặc định là 0
                printf("Error: Failed to free memory for process with PID: %d\n", current_proc->pid);
                continue;
            }
        }
    }

    // Kiểm tra hàng đợi sẵn sàng (ready queue)
    struct queue_t *ready_queue = caller->mlq_ready_queue;
    if (ready_queue == NULL) {
        printf("Error: Ready queue is NULL.\n");
        return -1;
    }

    temp_queue = *ready_queue; // Tạo bản sao để duyệt mà không làm thay đổi hàng đợi gốc
    while (!empty(&temp_queue)) {
        struct pcb_t *current_proc = dequeue(&temp_queue);
        if (current_proc == NULL) {
            printf("Error: Dequeued process is NULL.\n");
            continue;
        }
        if (strcmp(current_proc->path, proc_name) == 0) {
            printf("Terminating process in ready queue with PID: %d, Path: %s\n", current_proc->pid, current_proc->path);

            // Giải phóng tài nguyên của tiến trình
            if (libfree(current_proc, 0) != 0) { // Sử dụng reg_index mặc định là 0
                printf("Error: Failed to free memory for process with PID: %d\n", current_proc->pid);
                continue;
            }
        }
    }

    printf("Process termination completed for \"%s\"\n", proc_name);
    return 0;
}