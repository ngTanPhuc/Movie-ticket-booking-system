#include "include/syscall.h" // Bao gồm định nghĩa của các hàm và cấu trúc liên quan đến syscall
#include "include/common.h"  // Bao gồm các định nghĩa chung được sử dụng trong toàn bộ dự án

// Định nghĩa macro để khai báo các hàm xử lý syscall
#define __SYSCALL(nr, sym) extern int __##sym(struct pcb_t*,struct sc_regs*);
// Bao gồm tệp "syscalltbl.lst", nơi định nghĩa danh sách các syscall
#include "syscalltbl.lst"
#undef  __SYSCALL // Hủy bỏ định nghĩa của macro __SYSCALL để tránh xung đột sau này

/*
 * Bảng sys_call_table[] được sử dụng để ánh xạ số hiệu syscall với tên syscall.
 * Mỗi phần tử trong bảng là một chuỗi ký tự có định dạng "số hiệu - tên syscall".
 */
#define __SYSCALL(nr, sym) #nr "-" #sym, // Định nghĩa macro để tạo chuỗi "số hiệu - tên syscall"
const char* sys_call_table[] = {
   #include "syscalltbl.lst" // Bao gồm danh sách các syscall từ tệp "syscalltbl.lst"
};
#undef  __SYSCALL // Hủy bỏ định nghĩa của macro __SYSCALL

// Tính kích thước của bảng sys_call_table
const int syscall_table_size = sizeof(sys_call_table) / sizeof(char*);

/*
 * Hàm __sys_ni_syscall:
 * - Đây là một syscall mặc định (Not Implemented syscall).
 * - Được gọi khi số hiệu syscall không hợp lệ hoặc syscall chưa được triển khai.
 */
int __sys_ni_syscall(struct pcb_t *caller, struct sc_regs *regs)
{
   /*
    * DUMMY systemcall
    * Hàm này không thực hiện bất kỳ hành động nào và chỉ trả về 0.
    */
   return 0;
}

/*
 * Hàm syscall:
 * - Thực hiện lời gọi hệ thống dựa trên số hiệu syscall (nr) và tham số trong regs.
 * - caller: Tiến trình thực hiện syscall.
 * - nr: Số hiệu syscall.
 * - regs: Trạng thái các thanh ghi.
 */
#define __SYSCALL(nr, sym) case nr: return __##sym(caller,regs); // Macro ánh xạ số hiệu syscall với hàm xử lý tương ứng
int syscall(struct pcb_t *caller, uint32_t nr, struct sc_regs* regs)
{
    switch (nr) { // Kiểm tra số hiệu syscall
    #include "syscalltbl.lst" // Bao gồm danh sách các syscall và ánh xạ chúng với các hàm xử lý
    default: return __sys_ni_syscall(caller, regs); // Gọi hàm mặc định nếu syscall không hợp lệ
    }
};