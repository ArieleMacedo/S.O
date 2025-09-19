import threading
import time

def tarefa(nome, tempo):
    for i in range(5):
        print(f"Thread {nome} - passo {i+1}")
        time.sleep(tempo)  

t1 = threading.Thread(target=tarefa, args=("A", 1))
t2 = threading.Thread(target=tarefa, args=("B", 2))
t3 = threading.Thread(target=tarefa, args=("C", 3))

t1.start()
t2.start()
t3.start()

t1.join()
t2.join()
t3.join()

print("Todas as threads terminaram!")
