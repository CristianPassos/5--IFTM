package com.company;

import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class Cliente extends Thread {
    private Socket conexao;
    public Cliente(Socket socket) {
        this.conexao = socket;
    }
    public static void main(String args[])
    {
        try {
            Socket socket = new Socket("127.0.0.1", 5555);

            PrintStream saida = new PrintStream(socket.getOutputStream());
            BufferedReader teclado = new BufferedReader(new InputStreamReader(System.in));
            String meuNome = JOptionPane.showInputDialog("Digite seu nome: ");
            saida.println(meuNome.toUpperCase());

            saida.println(meuNome.toUpperCase());

            Thread thread = new Cliente(socket);
            thread.start();

            String msg;
            while (true)
            {

                System.out.print("Mensagem > ");
                msg = teclado.readLine();

                saida.println(msg);
            }
        } catch (IOException e) {
            System.out.println("Falha na Conexao... .. ." + " IOException: " + e);
        }
    }

    public void run()
    {
        try {

            BufferedReader entrada =
                    new BufferedReader(new InputStreamReader(this.conexao.getInputStream()));

            String msg;
            while (true)
            {

                msg = entrada.readLine();

                if (msg == null) {
                    System.out.println("Conexão encerrada!");
                    System.exit(0);
                }
                System.out.println();
                //imprime a mensagem recebida
                System.out.println(msg);
                //cria uma linha visual para resposta
                System.out.print("Responder > ");
            }
        } catch (IOException e) {
            // caso ocorra alguma exceção de E/S, mostra qual foi.
            System.out.println("Ocorreu uma Falha... .. ." +
                    " IOException: " + e);
        }
    }
}