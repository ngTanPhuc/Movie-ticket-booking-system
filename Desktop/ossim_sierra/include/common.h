#ifndef COMMON_H
#define COMMON_H

/* Define structs and routine could be used by every source files */

#include <stdint.h>
#include <stdio.h>

#ifndef OSCFG_H
#include "os-cfg.h"
#endif

#ifndef OSMM_H
#include "os-mm.h"
#endif

#define ADDRESS_SIZE 20
#define OFFSET_LEN 10
#define FIRST_LV_LEN 5
#define SECOND_LV_LEN 5
#define SEGMENT_LEN FIRST_LV_LEN
#define PAGE_LEN SECOND_LV_LEN

#define NUM_PAGES (1 << (ADDRESS_SIZE - OFFSET_LEN))
#define PAGE_SIZE (1 << OFFSET_LEN)

enum ins_opcode_t
{
	CALC,  // Just perform calculation, only use CPU
	ALLOC, // Allocate memory
	FREE,  // Deallocated a memory block
	READ,  // Write data to a byte on memory
	WRITE, // Read data from a byte on memory
	SYSCALL,
};

/* instructions executed by the CPU */
struct inst_t
{
	enum ins_opcode_t opcode;
	uint32_t arg_0; // Argument lists for instructions
	uint32_t arg_1;
	uint32_t arg_2;
	uint32_t arg_3;
};

struct code_seg_t
{
	struct inst_t *text;
	uint32_t size;
};

struct trans_table_t
{
	/* A row in the page table of the second layer */
	struct
	{
		addr_t v_index; // The index of virtual address
		addr_t p_index; // The index of physical address
	} table[1 << SECOND_LV_LEN];
	int size;
};

/* Mapping virtual addresses and physical ones */
struct page_table_t
{
	/* Translation table for the first layer */
	struct
	{
		addr_t v_index; // Virtual index
		struct trans_table_t *next_lv;
	} table[1 << FIRST_LV_LEN];
	int size; // Number of row in the first layer
};

/* PCB, describe information about a process */
struct pcb_t
{
    uint32_t pid;            // PID: Process ID - Mã số duy nhất của tiến trình, được dùng để phân biệt các tiến trình trong hệ thống
    uint32_t priority;       // Priority: Mức độ ưu tiên của tiến trình. Đây là mức độ ưu tiên cố định được gán cho tiến trình, ảnh hưởng đến thứ tự tiến hành xử lý.
    char path[100];          // Path: Đường dẫn đến tệp thực thi của tiến trình, cho phép xác định mã nguồn của tiến trình
    struct code_seg_t *code; // Code segment: Con trỏ đến phần mã lệnh của tiến trình. Lưu trữ các mã lệnh mà tiến trình thực thi.
    addr_t regs[10];         // Registers: Mảng chứa địa chỉ của các vùng bộ nhớ mà tiến trình đã được cấp phát, các giá trị này có thể là giá trị của các thanh ghi CPU
    uint32_t pc;             // Program Counter (PC): Con trỏ đến vị trí tiếp theo trong mã lệnh của tiến trình. Cho biết tiến trình đang thực thi đến đâu trong mã của nó.
    struct queue_t *ready_queue; // Ready Queue: Con trỏ đến hàng đợi chứa các tiến trình sẵn sàng thực thi (đang chờ CPU).
    struct queue_t *running_list; // Running List: Con trỏ đến danh sách các tiến trình đang thực sự chạy trên CPU.
    
#ifdef MLQ_SCHED
    // Các trường dưới đây chỉ có nếu hệ thống hỗ trợ Lập lịch đa cấp (Multi-level Queue Scheduling)
    struct queue_t *mlq_ready_queue; // MLQ Ready Queue: Hàng đợi chứa các tiến trình trong hệ thống đa cấp, có thể phân loại theo mức độ ưu tiên.
    uint32_t prio;                   // Prio: Mức độ ưu tiên của tiến trình trong lập lịch đa cấp, có thể thay thế mức ưu tiên mặc định của tiến trình.
#endif

#ifdef MM_PAGING
    // Các trường dưới đây chỉ có nếu hệ thống hỗ trợ phân trang bộ nhớ (Paging)
    struct mm_struct *mm;           // MM struct: Con trỏ đến cấu trúc chứa thông tin về bộ nhớ ảo của tiến trình.
    struct memphy_struct *mram;     // Mram: Con trỏ đến bộ nhớ vật lý của tiến trình.
    struct memphy_struct **mswp;    // Mswp: Con trỏ đến mảng các vùng bộ nhớ swap (bộ nhớ trao đổi).
    struct memphy_struct *active_mswp; // Active MSWP: Con trỏ đến vùng bộ nhớ swap đang được sử dụng.
    uint32_t active_mswp_id;        // Active MSWP ID: ID của vùng bộ nhớ swap đang được sử dụng.
#endif

    struct page_table_t *page_table; // Page Table: Con trỏ tới bảng trang của tiến trình, dùng để chuyển đổi giữa địa chỉ ảo và địa chỉ vật lý trong hệ thống phân trang.
    uint32_t bp;                     // Break Pointer (BP): Con trỏ đến điểm ngừng trong bộ nhớ của tiến trình, xác định nơi có thể tạm dừng hoặc kết thúc tiến trình.
};
#endif
