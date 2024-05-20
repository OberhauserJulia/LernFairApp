from classes import homework_class
def safe_doc(homeworkdata):
    name = homeworkdata['name']
    class_name = homeworkdata['class_name']
    file_data = homeworkdata['file_data']
    
    # Instanziieren Sie ein Objekt der Klasse homework_class
    homework_instance = homework_class.Student(name, class_name, file_data)
    
    # Rufen Sie die Methode save_to_database auf dem Objekt auf
    homework_instance.save_to_database() 
    
    return "safe_math_homework_service"