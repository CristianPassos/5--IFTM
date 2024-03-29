package projeto04;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Enumeration;
import java.util.Vector;

public class Servidor extends Thread {

    private static Vector clientes;
    private Socket conexao;
    private String meuNome;

    public Servidor(Socket s) {
        conexao = s;
    }

    public static void main(String[] args) throws IOException {
        clientes = new Vector();
        ServerSocket s = new ServerSocket(2000);
        while (true) {
            System.out.print("Esperando conectar...");
            Socket conexao = s.accept();
            System.out.println(" Conectou!");
            Thread t = new Servidor(conexao);
            t.start();
        }
    }

    public void run() {
        BufferedReader entrada = null;
        try {
            entrada = new BufferedReader(new InputStreamReader(conexao.getInputStream()));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        PrintStream saida = null;
        try {
            saida = new PrintStream(conexao.getOutputStream());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        try {
            meuNome = entrada.readLine();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if (meuNome == null) {
            return;
        }
        clientes.add(saida);
        String linha = null;
        try {
            linha = entrada.readLine();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        while ((linha != null) && (!linha.trim().equals(""))) {
            try {
                sendToAll(saida, " disse: ", linha);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            try {
                linha = entrada.readLine();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        try {
            sendToAll(saida, " saiu ", " do Chat!");
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        clientes.remove(saida);
        try {
            conexao.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void sendToAll(PrintStream saida, String acao, String linha) throws IOException {
        Enumeration e = clientes.elements();
        while (e.hasMoreElements()) {
            PrintStream chat = (PrintStream) e.nextElement();
            if (chat != saida) {
                chat.println(meuNome + acao + linha);
            }
            if (acao == " saiu ") {
                if (chat == saida)
                    chat.println("");
            }
        }
    }

}