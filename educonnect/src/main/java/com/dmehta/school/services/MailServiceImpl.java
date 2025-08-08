package com.dmehta.school.services;

import java.io.UnsupportedEncodingException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dmehta.school.model.Mail;

@Service
public class MailServiceImpl implements MailService {

	private static final Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

	@Autowired
	JavaMailSender mailSender;

	@Override
	public void sendMail(Mail mail) {
		// Input validation
		if (mail == null) {
			throw new IllegalArgumentException("Mail object cannot be null");
		}
		
		if (!StringUtils.hasText(mail.getMailFrom()) || !StringUtils.hasText(mail.getMailTo()) ||
			!StringUtils.hasText(mail.getMailSubject()) || !StringUtils.hasText(mail.getMailContent())) {
			throw new IllegalArgumentException("All mail fields (from, to, subject, content) are required");
		}
		
		// Email format validation
		if (!isValidEmail(mail.getMailFrom()) || !isValidEmail(mail.getMailTo())) {
			throw new IllegalArgumentException("Invalid email format");
		}

		MimeMessage mimeMessage = mailSender.createMimeMessage();

		try {
			logger.info("Sending email from {} to {} with subject: {}", 
				mail.getMailFrom(), mail.getMailTo(), mail.getMailSubject());

			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

			mimeMessageHelper.setSubject(mail.getMailSubject());
			mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom(), "School Listing System"));
			mimeMessageHelper.setTo(mail.getMailTo());
			mimeMessageHelper.setText(mail.getMailContent());

			mailSender.send(mimeMessageHelper.getMimeMessage());
			logger.info("Email sent successfully to {}", mail.getMailTo());

		} catch (MessagingException e) {
			logger.error("Failed to send email to {}: {}", mail.getMailTo(), e.getMessage(), e);
			throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
		} catch (UnsupportedEncodingException e) {
			logger.error("Encoding error while sending email to {}: {}", mail.getMailTo(), e.getMessage(), e);
			throw new RuntimeException("Email encoding error: " + e.getMessage(), e);
		}
	}
	
	private boolean isValidEmail(String email) {
		return email != null && email.matches("^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$");
	}

}
